const jwt = require('jsonwebtoken');
const { User } = require('../models');

const PUBLIC_PATHS = [
    '/register',
    '/login',
    '/graphql',
    '/send_to_rabbit',
    '/ui',
]

module.exports = async (req, res, next) => {
    // Ну а иначе как мы вообще в систему то попадем
    if (PUBLIC_PATHS.includes(req.path)) {
        return next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        const decoded = jwt.verify(token, 'jwt_secret');
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid or it has expired already.' });
    }
};
