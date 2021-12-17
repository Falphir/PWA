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

    //procurar tudo
    function findAll(pagination){
        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject){
            PlayerModel.find({}, {}, { skip, limit }, function (err, users) {
                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            });
        })

        .then(async (users) => {
            
            const totalUsers = await PlayerModel.count();

            return Promise.resolve({
                players: users,
                pagination: {
                    pageSize: limit,
                    page: Math.floor(skip / limit),
                    hasMore: (skip + limit) < totalUsers,
                    total: totalUsers
                }
            });
        });
    }


    //procurar por id
    function findById(id){
        return new Promise(function (resolve, reject) {
            PlayerModel.findById(id, function (err, user) {
                if(err) reject(err);

                //objecto de todos os users
                resolve(user);
            });
        });
    }


    //atualizar
    function update(id, values){
        return new Promise(function (resolve, reject) {
             //values - {name: jose} || {lastname: carvalho} || { name: j, lastname: c }
             PlayerModel.findByIdAndUpdate(id, values, function (err, user) {
                if(err) reject(err);

                resolve(user);
             });
        });
    }


    //remover pelo id
    function removeById(id){
        return new  Promise(function (resolve, reject) {
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