const cookieParser = require('cookie-parser');
const express = require('express');
const Users = require('../data/users');

function AuthRouter(){
    let router = express();

    //camadas
    router.use(express.json( { limit: '100mb' } ));

    router.use(express.urlencoded( { limit: '100mb', extended: true } ));

    router.use(cookieParser())
    //fim camadas



    //auth/register        
    router.route('/register')
        //POST - create user
        .post(function (req, res, next) {
            console.log('---|create user|---');
            const body = req.body;

            //console.log(body);

            Users.create(body)
                .then((user) => Users.createToken(user))

                .then((response) => {
                    console.log('save');
                    res.status(200);
                    res.send(response);
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    console.log(err);
                    next();
                });
        });



    //auth/me
    router.route('/me')
        //GET - verify token
        .get(function(req, res, next) {
            console.log('---|verify token|---');
            let token = req.headers['x-access-token'];

            if(!token) {

                return res.status(401).send({ auth: false, message: 'No token provided.' })
            }

            return Users.verifyToken(token)
                .then((decoded) => {

                    res.status(202).send({ auth: true, decoded });
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });



    //auth/login
    router.route('/login')
        //POST - validar se o user existe na BD
        .post(function (req, res, next) {
            console.log('---|verifiy user if exists|---');
            let name = req.body.name;
            let password = req.body.password;

            //console.log(name);
            //console.log(password);

            return Users.findUser({ name, password })
                .then((user) => Users.createToken(user))

                .then((response) => {
                    console.log('save');
                    res.cookie('token', login.token, { httpOnly: true });
                    res.status(200);
                    res.send(response);
                })
            
                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });





        return router;
}

module.exports = AuthRouter;