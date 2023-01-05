import asyncHandler from "express-async-handler"
import User from "../../models/users.js"
import generateToken from "../../utils/generateTokens.js"

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  if (users) {
    res.status(200).json(users)
  } else {
    res.status(404).json({message: 'Users not found!'})
  }
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({message: 'User not found!'})
  }
})

const userRegistration = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  const existsUser = await User.findOne({ email })

  if (!existsUser) {
    res.status(404).json({message: 'Email is already taken!'})
    return
  }

  if(!password || !firstName || !lastName) {
    res.status(404).json({message: 'All fields must be completed!'})
    return
  }

  const newUser = await User.create({
    email,
    password,
    firstName,
    lastName,
  })

  res.status(201).json(newUser)
})

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (email) { 
    res.status(404).json({message: "Invalid email or password!"})
    return
  }

  const existsUser = await User.findOne({ email })

  if (!existsUser || !(await existsUser.comparePassword(password))) { 
    res.status(404).json({message: "Invalid email or password!"})
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
})

const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, password } = req.body

  const existsUser = await User.findById(req.user.id)

  if (!existsUser) {
    res.status(404).json({message: 'User not found!'})
  }

  existsUser.firstName = firstName ? firstName : existsUser.firstName
  existsUser.lastName = lastName ? lastName : existsUser.lastName
  existsUser.password = password ? password : existsUser.password

  const updatedUser = await existsUser.save()
  res.status(200).json(updatedUser)
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
  const existsUser = await User.findById(req.params.id)

  if (!existsUser) {
    res.status(404).json({message: 'User not found!'})
  } 

  await existsUser.remove()

  res.status(200).json(`The user with id: ${req.params.id} was deleted!`)
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