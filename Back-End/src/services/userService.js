const User = require("../database/userRepository")

const getUsers = async(searchTerm) =>{
    return await User.getUsers(searchTerm)
}

module.exports = {getUsers}