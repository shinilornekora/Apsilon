const { Template } = require('../../models')

module.exports = {
    mode: 'get',
    handler: async (req, res) => {
        try {
            await Template.create({ 
                name: 'Simple Template', 
                content: '<h1>Hello, world!</h1>' 
            });

            await Template.create({ 
                name: 'Basic Form', 
                content: '<form><input type="text" name="username"><button type="submit">Submit</button></form>' 
            });
 
            res.status(201).json({ message: 'Database seeded with test data' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error seeding database' });
        }
    }
}