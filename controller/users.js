const userService = require("../services/users");
const createError = require("http-errors");

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();

    res.json({ success: true, data: users });
};