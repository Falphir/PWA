function UserService(UserModel) {
    let service = {
        create,
        createToken
    };

    function create(values) {
        let newUser = UserModel(values);
        return save(newUser);
    }

    function save(model) {
        return new Promise(function (resolve, reject) {
            //do a thing, possibly async, then...
            model.save(function (err) {
                console.log(err);
                if (err) reject("There's a problema with register");

                resolve('Player Created!')
            });
        });
    }

    function createToken(user) { 
        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.expiresPassword
        });

        return {auth: true, token}
    }

    return service;
}

module.exports = UserService;