const jwt = require('jsonwebtoken');
const privateKey = "Bonjour";
const db = require('../models');
const { password } = require("../db.config");
const bcrypt = require('bcrypt');

exports.authMiddleware = async (req, res, next) => {
    console.log("authMiddleware");
    if (req.headers && !req.headers.authorization) {
        res.status(401).json({success: false, message: 'You need to be authenticated'});
    } else {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, privateKey);
            if (decoded) {
                next();
            } else {
                res.status(401).json({success: false, message: 'This authentication is no more valid'});
            }
        } catch(e) {
            next(e);
        }
    }
}

exports.login = async (req, res) => {
    console.log("LOGIN");
    if (req.body.firstName && req.body.password) {
        console.log("user");
        const user = await db.users.findOne({
            where: {firstName: req.body.firstName}
        });
        console.log("USER");
        if (user){
            console.log("verifiedUser");
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result){
                    console.log("token");
                    var token = jwt.sign({data: { firstName: user.firstName }}, privateKey, {expiresIn: '1min'});
                    res.setHeader('Authorization', 'Bearer '+ token);
                    res.status(200).json({success: true, token});
                } else {
                    res.status(401).json({success: false, message: 'Password is incorrect'});
                }
            });
        } else {
            res.status(404).json({success: false, message: 'This user doesn\'t exists'});
        }
    } else {
        res.status(400).json({success: false, message: 'username and password are required'});
    }
}