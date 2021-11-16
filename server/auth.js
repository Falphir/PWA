const bodyParser = require ('body-parser');
const express = require ('express');
const Users = require ('../data/users')

function AuthRouter() {
     let router = express();
     
     router.use(bodyParser.json({limit : '100mb'}));
     router.use(bodyParser.urlencoded({ limit : '100mb', extended: true}));

     router.route('./register')
        .post(function (req, res, next) {
            const body = req.body;

            Users.create(body)
                .then((user) => Users.createToken(user))
                .then((response) => {
                    res.status(200);
                    res.send(response);
                })
                .catch((err) => {
                    res.status(500);
                    res.send(err);
                    next();
                });
        });

    return router;
}

module.exports = AuthRouter