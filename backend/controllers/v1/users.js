import asyncHandler from "express-async-handler"
import User from "../../models/users.js"
import generateToken from "../../utils/generateTokens.js"

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})

    if(!users) {
      res.status(404).json({message: 'Empty collection!'})
      return
    }

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({message: 'Error from server, please try again later!'})
  }
})

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({message: 'User not found!'})
  }
})

const userRegistration = asyncHandler(async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    if(!password || !firstName || !lastName  || !email) {
      res.status(404).json({message: 'All fields must be completed!'})
      return
    }

    const existsUser = await User.findOne({ email })

    if (existsUser) {
      res.status(404).json({message: 'Email is already taken!'})
      return
    }

    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
    })

    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({message: 'Error from server, please try again later!'})
  }
})

const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email) { 
      res.status(404).json({message: "Invalid email or password!"})
      return
    }

    const existsUser = await User.findOne({ email })

    const checkPassword = await existsUser.comparePassword(password)

    if (!existsUser || !checkPassword) { 
      res.status(404).json({message: "Invalid email or password!"})
      return
    }

    const userData = {
      id: existsUser._id,
      firstName: existsUser.firstName,
      lastName: existsUser.lastName,
      email: existsUser.email,
      isAdmin: existsUser.isAdmin,
      token: generateToken(existsUser._id),
    }

    res.status(200).json(userData)
  } catch (error) {
    res.status(500).json({message: 'Error from server, please try again later!'})
  }
})

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, password, isAdmin } = req.body

    const existsUser = await User.findById(req.params.id)

    if (!existsUser) {
      res.status(404).json({message: 'User not found!'})
    }

    existsUser.firstName = firstName ? firstName : existsUser.firstName
    existsUser.lastName = lastName ? lastName : existsUser.lastName
    existsUser.password = password ? password : existsUser.password
    existsUser.isAdmin = isAdmin ? isAdmin : existsUser.isAdmin

    const updatedUser = await existsUser.save()
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({message: 'Error from server, please try again later!'})
  }
})

const detailsUser = asyncHandler(async (req, res) => {
  const existsUser = req.user

  if (!existsUser) {
    res.status(404).json({message: 'User not found!'})
  }

  const userData = {
    id: existsUser._id,
    firstName: existsUser.firstName,
    lastName: existsUser.lastName,
    email: existsUser.email,
    isAdmin: existsUser.isAdmin,
  }

  res.status(200).json(userData)
})

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const existsUser = await User.findById(req.params.id)

    if (!existsUser) {
      res.status(404).json({message: 'User not found!'})
    } 

    await existsUser.remove()

    res.status(200).json(`The user with id: ${req.params.id} was deleted!`)
  } catch (error) {
    res.status(500).json({message: 'Error from server, please try again later!'})
  }
  
})

export {
  getUsers,
  getUser,
  userRegistration,
  updateUser,
  authUser,
  deleteUser,
  detailsUser
}