const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router
    .get("/users/preview/:searchTerm", userController.getPreviewUsers)
    .get("/users/search", userController.getUsers)

module.exports = router