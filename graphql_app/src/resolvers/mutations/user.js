const { User } = require('../../models');

async function createUser(_, { username, password }) {
    // Пусть он просто создается без проблем пока что
    if (username && password) {
        return User.create({
            username,
            password,
        })
    }

    throw 'Seems like you provided no password or login. Oops!'
}

module.exports = {
    createUser,
}