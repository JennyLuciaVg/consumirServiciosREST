var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.listUsers);

/* GET to show the newUser form. */
router.get('/newUser', userController.newUser);

/* POST user by id and save changes. */
router.post('/newUser', userController.createUser);

/* GET user by id and load it. */
router.get('/:idUser', userController.loadUser);

/* PUT user by id and save changes. */
router.put('/:idUser', userController.editUser);

/* DELETE user by id */
router.delete('/:idUser', userController.deleteUser);

module.exports = router;
