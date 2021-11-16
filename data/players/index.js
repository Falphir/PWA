const Players = require('./player');
const PlayersService = require('./service');

const service = PlayersService(Players);

module.exports = service;