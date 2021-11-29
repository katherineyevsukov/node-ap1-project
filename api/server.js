// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.json({ message: 'api is running'})
})

server.get('/api/users', async (req, res) => {
    try{
        const users = await Users.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({ message: "The users information could not be retrieved"})
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        !user ? res.status(404).json({ message: "The user with the specified ID does not exist"}) : res.status(200).json(user)
    } catch(err) {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
