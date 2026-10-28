const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const app = express()
// Middleware to parse JSON body
app.use(express.json())
// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MERN-Task')
    console.log("Connected to MongoDB")
  } catch (err) {
    console.error("MongoDB connection error:", err)
  }
}
connectDB()
// Define Mongoose model
const User = mongoose.model('User', new mongoose.Schema({ email: { type: String, unique: true }, password: String }, { versionKey: false }), 'users')
// POST /signup — Create a new user
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" })
    await User.create({ email, password: await bcrypt.hash(password, 10) })
    res.status(201).json({ message: "Signed up successfully" })
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Email already exists" })
    console.error(err)
    res.status(500).json({ error: "Error signing up" })
  }
})
// Start server
app.listen(3000)
