const express = require('express');
const Players = require('../data/players');


function PlayerRouter(){

    let router = express();

    router.use(express.json({ limit: '100mb' }));
    router.use(express.urlencoded({ limit: '100mb', extended: true }));

    router.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next();
    })

    router.route('/players')
        //GET
        //get do findAll players
        .get(function (req, res, next) {
            console.log('get all Players'); //retorna todos os players
            Players.findAll()
                .then((players) => {
                    res.send(players);
                    next();
                })
                .catch((err) => {
                    next();
                });
        })

        //POST
        .post(function (req, res, next) {
            console.log('post');
            let body = req.body;

            //post do create players
            Players.create(body)
                .then(() => {
                    console.log('gravei');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log('já existe');
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });
        });

    router.route('/team')
        .put(function (req, res) {
            console.log('put');
            res.send('put');
        });

    router.route('/players/:playerId')
        .get(function (req, res, next) {
            console.log('get for one Id');
            let playerId = req.params['playerId'];

            Players.findById(playerId)
                .then((player) => {
                    res.status(200);
                    res.send(player);
                    next();
                })
                .catch((err) => {
                    res.status(404);
                    next();
                });
        
        })
    .put(function (req, res, next) {
        let playerId = req.params['playerId'];
        let body = req.body;
        console.log(body);
        Players.update(playerId, body)
            .then((player) => {
                res.status(200);
                res.send(player);
                next();
            })
            .catch((err) => {
                res.status(404);
                next();
            })
    })
    .delete(function (req, res, next) {
        console.log('del for one Id');
        let playerId = req.params.playerId;
        Players.removeById(playerId)
            .then(() => {
                console.log('test');
                res.status(200).json();
                next();
            })
            .catch ((err) => {
                console.log('err');
                res.status(404);
                next();
            });
    });
    
    router.route('/players/:playerId/hobbies')
    .get(function (req, res, next) {
        console.log('get for one Id');
        let playerId = req.params['playerId'];
        let hobbies = req.body.hobbies;

        Players.findById(playerId)
            .then((player) => {
                res.status(200);
                res.send(hobbies);
                next();
            })
            .catch((err) => {
                res.status(404);
                next();
            });
    
    })

    


    return router;
}

module.exports = PlayerRouter;
