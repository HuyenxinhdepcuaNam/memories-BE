import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"


export const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find()

        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    // console.log('check req.body', post)
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

        const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

        res.status(202).json(updatePost)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    // const post = req.post

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

        // const deletePost = await PostMessage.findByIdAndDelete(post._id, post, { new: true })
        await PostMessage.findByIdAndRemove(id)

        res.status(203).json(id)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const likePost = async (req, res) => {


    const { id } = req.params
    console.log('check userId', req.userId)
    console.log('check id', id)

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex(id => id === String(req.userId))

    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter(id => id !== String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedPost)
}