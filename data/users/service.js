const config = require("../../config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function UserService(UserModel){
    let service = {
        create,
        save,
        createToken,
        verifyToken,
        findUser,
        createPassword,
        comparePassword,
    };


    //criar user
    function create(user){
        return createPassword(user)
            .then((hashPassword, err) => {
                if(err){
                    return Promise.reject("Not saved");
                }

                let newUserWithPassword = {
                    ...user,
                    password: hashPassword,
                }

                let newUser = UserModel(newUserWithPassword);
                return save(newUser); //guarda novo user
            });
    }


    //guardar user
    function save(newUser){
        return new Promise(function (resolve, reject){

            //guardar
            newUser.save(function (err) {

                if (err) reject("There is a problem with register");
                resolve("user created");
            });
        });
    }


    //criar token
    function createToken(user){
        
        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.expiresPassword 
        });

        return { auth: true, token }
    }


    //verificar token
    function verifyToken(token){
        return new Promise((resolve, reject) => {
            
            jwt.verify(token, config.secret, (err, decoded) => {

                if(err){

                    reject();
                }

                return resolve(decoded);
            })
        })
    }


    //procurar user pelo nome
    function findUser({ name, password }) {
        return new Promise(function (resolve, reject) {

            UserModel.findOne({ name }, function (err, user) {
                if(err) reject(err);
                //objeto de todos os users

                if(!user){
                    reject("This data is wrong");
                }

                resolve(user);
            });
        })
        .then((user) => {
            return comparePassword(password, user.password)
                .then((match) => {
                    
                    if(!match) return Promise.reject("User not valid");

                    return Promise.resolve(user);
                })
        })
    }


    //criar password encriptada
    function createPassword(user){
        return bcrypt.hash(user.password, config.saltRounds);
    }


    //comparar password encriptada com a original (???)
    function comparePassword(password, hash){
        return bcrypt.compare(password, hash);
    }



    return service;
}

module.exports = UserService;