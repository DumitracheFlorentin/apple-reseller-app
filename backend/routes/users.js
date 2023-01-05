import express from "express"
import {
  getUsers,
  getUser,
  userRegistration,
  updateUser,
  authUser,
  deleteUser,
  detailsUser
} from "../controllers/v1/users.js"

const router = express.Router()

router.route("/").get(getUsers)
router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser).get(detailsUser)
router.route("/register").post(userRegistration)
router.route("/auth").post(authUser)

export default router