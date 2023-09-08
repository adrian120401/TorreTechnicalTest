const userService = require("../services/userService")
const NodeCache = require('node-cache')

const cache = new NodeCache()

const getPreviewUsers = async(req, res) => {
    const {params: {searchTerm}} = req

    const cachedResults = cache.get(searchTerm)
    if (cachedResults) {
        res.status(200).send({status: "OK", data: cachedResults})
    }
    else{
        try {
            const users = await userService.getPreviewUsers(searchTerm)
            cache.set(searchTerm, users, 120);
            res.status(200).send({status: "OK", data: users})
        } catch (error) {
            res.status(error?.status || 500).send({status: "FAILED", message:{error: error?.message || "Error"}})
        }
    }
}

const getUsers = async(req,res) => {
    const query = req.query.query;
    const page = req.query.page || 1;
    try {
        const users = await userService.getUsers(query, page)
        res.status(200).send({status: "OK", data: users})
    } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED", message:{error: error?.message || "Error"}})
    }
}


module.exports = {getPreviewUsers, getUsers}