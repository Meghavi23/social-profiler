const User = require('../model/user');
const authentication = require('../util/jwt');
const bcrypt = require("bcrypt");

//to create new user
exports.postAddUser = (req, res, next) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10).then(hash => {
        return User.create({
            email: email,
            password: hash
        }).then(result => {
            res.send(JSON.stringify({
                "message": "user created"
            }));
        })
            .catch(err => {
                console.log(err);
            });
    });
};

//User Login
exports.loginUser = (req, res, next) => {
    let fetchedUser;
    const { email, password } = req.body;
    if (email && password) {
        User.findOne({ where: { email: email } })
            .then(user => {

                if (!user) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.password);
            })
            .then(result => {
                console.log(result);
                if (!result) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                let payload = { id: fetchedUser.id }
                let token = authentication.jwt.sign(payload, authentication.jwtOptions.secretOrKey)

                res.status(200).json({
                    token: token,
                    expiresIn: process.env.JWT_EXP,
                    userId: fetchedUser.id
                });
            })
            .catch(err => {
                return res.status(401).json({
                    message: "Auth failed"
                });
            });
    }
};
