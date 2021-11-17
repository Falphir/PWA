const config = {
    db: 'mongodb://localhost/players-test',
    secret: 'supersecret',
    expiresPassword: '86400', //expira em 24hrs
    saltRounds: 10
}

module.exports = config;