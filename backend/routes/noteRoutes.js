const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const Note = require('../models/Note')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch {
        return res.status(401).json({ message: 'Invalid Token!' })
    }
}

router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;

    try {
        const note = new Note({ userId: req.user.id, title, content })
        await note.save()
        res.status(201).json(note)
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create note" })
    }
})

router.get('/', verifyToken, async (req, res) => {

    try {
        const notes = await Note.find({ userId: req.user.id })
        res.json(notes)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "failed fetching note" })

    }

})

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedNote = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user.id },
            req.body, { new: true }
        )
        if (!updatedNote) 
            return res.status(404).json({message: "Note not found"})
            res.json(updatedNote)
        
    } catch (err) {
        res.status(500).json({error: "Failed to update note"})
    }
})

router.delete('/:id', verifyToken, async (req, res) => {

    try {
    const deletedNote = await Note.findOneAndDelete({_id: req.params.id, userId: req.user.id})

    if (!deletedNote) return res.status(404).json({message: 'Note not found'})
        res.json({message: "Note deleted"})

    } catch (err) {
        res.status(500).json({error: "Failed to delete note"})
    }

})


module.exports = router;


