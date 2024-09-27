const { User } = require('../../../models');
const bcrypt = require('bcrypt');

module.exports = {
    mode: 'post',
    handler: async (req, res) => {
        try {
            const { username, password, role } = req.body;

            const existingUser = await User.findOne({ where: { username } });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = await User.create({
                username,
                password: hashedPassword,
                role: role || 'user',
            });
    
            res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
        } catch (error) {
            console.log('Плохой запрос', req.body);
            res.status(500).json({ error: error.message });
        }
    }
}