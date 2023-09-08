const userService = require("../services/userService")

const getUsers = async(req, res) => {
    const {params: {searchTerm}} = req
    try {
        const users = await userService.getUsers(searchTerm)
        res.status(200).send({status: "OK", data: users})
    } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED", message:{error: error?.message || "Error"}})
    }
}


module.exports = {getUsers}