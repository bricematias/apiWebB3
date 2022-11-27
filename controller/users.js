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
                    next(createError(400, "Error when creating this user, verify your args"));
                }
            });
        });
    } else {
        next(createError(400, "Cannot add this user, make sure all args has been sent"));
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

exports.updateUser = async (req, res, next) => {
    if(req.body && req.params.id) {
        const oldUser = await userService.getUserById(req.params.id);
        if(oldUser === 1){
            let firstname;
            let lastName;
            let password;
            oldUser.map(async (user) => {
                req.body.firstname ? firstname = req.body.firstname : firstname = user.dataValues.firstname;
                req.body.lastName ? lastName = req.body.lastName : lastName = user.dataValues.lastName;
                if(req.body.password){
                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(req.body.password, salt, async function(err, hash) {
                            const userUpdated = await userService.updateUser(req.params.id, firstname, lastName, hash);
                            if (userUpdated) {
                                res.status(200).json({success: true});
                            } else {
                                next(createError(400, "Error when creating this user, verify your args"));
                            }
                        });
                    });
                } else {
                    password = user.dataValues.password;
                    const userUpdated = await userService.updateUser(req.params.id, firstname, lastName, password);
                    if (userUpdated) {
                        res.status(200).json({success: true});
                    } else {
                        next(createError(400, "Error when updating this user, verify your args"));
                    }
                }
            })
        } else {
            next(createError(400, "This user not exist"));
        }
    } else {
       next(createError(400, "Cannot update this user, make sure all args has been sent"));
    }
 }