const userService = require("../services/users");
const createError = require("http-errors");
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();

    res.json({ success: true, data: users });
};

exports.getUserById = async (req, res) => {
    res.set("Cache-Control", "max-age=30");
    let userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        throw new createError(400, "the id in parameter must be a valid integer");
    }

    const user = await userService.getUserById(userId);

    if (userId && user) {
        res.json({ success: true, data: user });
    } else {
        throw new createError(404, "no book found for this id");
    }
};


exports.addUser = async (req, res, next) => {
    if (req.body && req.body.firstName && req.body.lastName && req.body.password) {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                const userCreated = await userService.addUser(req.body.firstName , req.body.lastName , hash);
                if (userCreated) {
                    res.status(201).json({success: true, id: userCreated.id});
                } else {
                    next(createError(400, "Error when creating this player, verify your args"));
                }
            });
        });
    } else {
        next(createError(400, "Cannot add this player, make sure all args has been sent"));
    }
}

exports.deleteUser = async (req, res, next) => {
    if (req.params.id) {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);
        if (user.length === 1) {
            const nbOfDeletion = await userService.deleteUser(id);
            if (nbOfDeletion === 1) {
                res.json({success: true});
            } else {
                next(createError(500, 'Unknown error when trying to delete this user, maybe it\'s already deleted'));
            }
        } else {
            next(createError(404, `The user with name '${id}' doesn't exists, it cannot be deleted`));
        }
    } else {
        next(createError(400, "The name is required"));
    }
}