const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: 'Hello World!' });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});
router.post('/adduser', controllers.createUser)
router.get('/users', controllers.getAllUsers)


module.exports = router
