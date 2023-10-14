const createError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const SALT_ROUNDS = 10;

class UserController {
    static async getUsers (req, res, next) {
        try {
            let query = {};
            if ('email' in req.query) {
                query.email = req.query.email;
            }
            const users = await User.find(query);
            res.send(users);
        } catch (err) {
            next(err);
        }
    }

    static async getUser (req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            res.send(user);
        } catch (err) {
            next(err);
        }
    }

    static async createUser (req, res, next) {
        try {
            const db_user_exists = await User.exists({username: req.body.email});
            if (db_user_exists) {
                throw createError(400, `User with email "${req.body.email}" already exists.`);
            }
            req.body.password = await new Promise((resolve, reject) => {
                bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
                    if (err) {
                        reject(createError(400, err));
                    } else {
                        resolve(hash);
                    }
                });
            });
            let user = await new User(req.body).save();
            res.send(user);
        } catch (err) {
            next(err);
        }
    }

    static async login (req, res, next) {
        try {
            const user = await User.findOne({email: req.body.email});
            if (!user) {
                throw createError(400, 'User not found');
            }
            const result = await new Promise((resolve, reject) => {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            if (!result) {
                throw createError(401, 'Incorrect Username or Password');
            }
            req.session.user = user._id;
            res.send(user);
        } catch(err) {
            next(err);
        }
    }

    static async logout (req, res, next) {
        try {
            req.session.user = null;
            await new Promise((resolve, reject) => {
                req.session.save((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            await new Promise((resolve, reject) => {
                req.session.regenerate((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;