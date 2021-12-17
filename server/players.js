const cookieParser = require('cookie-parser');
const express = require('express');
const Players = require('../data/players');
const Player = require('../data/players/player');
const Users = require('../data/users');
const scopes = require('../data/users/scopes');
const pagination = require('../middleware/pagination');
const VerifyToken = require('../middleware/Token');


function PlayerRouter(){

    let router = express();

    //camadas
    router.use(express.json( { limit: '100mb' } ));

    router.use(express.urlencoded( { limit: '100mb', extended: true } ));

    router.use(function (req, res, next) {
        var today = new Date(); 

        console.log('Time:', today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        next();
    });

    router.use(cookieParser());
    
    router.use(VerifyToken);

    router.use(pagination);
    //fim camadas


    

    router.route('/players')
        //GET - findAll players
        .get(Users.autorize([scopes["read-all"], scopes["read-posts"]]), function (req, res, next) {
            Players.findAll(req.pagination)
                .then((responseServer) => {
                    console.log('---|all players|---'); //retorna todos os players

                    const response = {
                        auth: true,
                        ...responseServer
                    };

                    res.send(response);
                    next();
                })
                .catch((err) => {
                    console.log(err);
                    next();
                });
        })

    /* router.route('/players')
        //GET - findAll players
        .get(Users.autorize([scopes["read-all"], scopes["read-posts"]]), function (req, res, next) {
            Players.findAll()
                .then((players) => {
                    console.log('---|all players|---'); //retorna todos os players

                    const response = {
                        auth: true,
                        players: players
                    };

                    res.send(response);
                    next();
                })
                .catch((err) => {
                    console.log('"---|error|---"');
                    next();
                });
        }) */

        //POST - create player
        .post(Users.autorize([scopes["manage-posts"]]), function (req, res, next) {
            console.log('---|create player|---');
            let body = req.body;

            Players.create(body)
                .then(() => {
                    console.log('save');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log('"---|error|---"');
                    console.log('player already exists');
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });
        });




        router.route('/players/:playerId')
            //GET - findById player
            .get(function (req, res, next) {
                let playerId = req.params['playerId'];

                Players.findById(playerId)
                    .then((player) => {
                        console.log('---|find one player by ID|---'); //retorna o player pelo Id
                        res.status(200);
                        res.send(player);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|error|---"');
                        res.status(404);
                        next();
                    });
            })

            //PUT - update player by ID
            .put(function (req, res, next) {
                let playerId = req.params['playerId'];
                let body = req.body;

                Players.update(playerId, body)
                    .then((player) => {
                        console.log('---|update one player by ID|---'); //altera dados do player
                        res.status(200);
                        res.send(player);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|error|---"');
                        res.status(404);
                        next();
                    });
            })

            //DELETE - delete player by ID
            .delete(function (req, res, next) {
                let playerId = req.params['playerId'];

                Players.removeById(playerId)
                    .then(() => {
                        console.log("---|delete one player by ID|---");
                        res.status(200);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|error|---"');
                        res.status(404);
                        next();
                    });
            });




            router.route('/players/:playerId/hobbies')
                //GET - findById player return hobbies
                .get(function (req, res, next) {
                    let playerId = req.params['playerId'];
                    let hobbies = req.body.hobbies;
    
                    Players.findById(playerId)
                        .then((player) => {
                            console.log('---|find one player by ID return hobbies|---'); //retorna o hobbie do player pelo Id
                            res.status(200);
                            res.send(hobbies);
                            next();
                        })
    
                        .catch((err) => {
                            console.log('"---|error|---"');
                            res.status(404);
                            next();
                        });
                })




    router.route('/team')
        .put(function (req, res) {
            console.log('put');
            res.send('put');
        });


    return router;
}

module.exports = PlayerRouter;
