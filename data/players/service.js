function PlayerService(PlayerModel){
    let service = {
        create,
        findAll,
        findById,
        update,
        removeById
    };

    //criar jogador
    function create(values){
        let newPlayer = PlayerModel(values);
        return save(newPlayer); //guarda novo jogador
    }

    //guardar jogador
    function save(newPlayer){
        return new Promise(function (resolve, reject){

            //guardar
            newPlayer.save(function (err) {
                if (err) reject(err);

                resolve('Player created!');
            });
        });
    }

    //procurar
    function findAll(){
        return new Promise(function (resolve, reject){
            PlayerModel.find({}, function (err, users) {
                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            });
        });
    }

    function findById(id) {
        return new Promise(function (resolve, reject) {
            PlayerModel.findById(id, function (err, user) {
                if (err) reject (err);
                // object of all the users
                resolve(user);
            })
        })
    }

    function update(id, values) {
        return new Promise(function (resolve, reject) { 
            PlayerModel.findByIdAndUpdate(id, values, function(err, user) {
                if(err) reject(err);

                resolve(user);
            });
        });
    }

    function removeById(id) {
        return new Promise(function (resolve, reject) {
            console.log(id);
            PlayerModel.findByIdAndRemove(id, function (err) {
                console.log(err);
                if(err) reject(err);
                resolve();
            });
        });
    }

    return service;
}

module.exports = PlayerService;