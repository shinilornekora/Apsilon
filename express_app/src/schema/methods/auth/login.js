const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    mode: 'post',
    handler: async (req, res) => {
        const { username, password } = req.body;
    
        try {
            const user = await User.findOne({ where: { username } });
            
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            // Генерируем токен
            const token = jwt.sign({ id: user.id }, 'jwt_secret', { expiresIn: '1h' });
            
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}