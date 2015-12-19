var userService = require('../services/userService');

/**
 * Gets all the users and list them all in screen.
 */
exports.listUsers = function(req, res) {
	// Use the method loadUsers form userService to get all the users
	userService.loadUsers(function(users, err) {
		if (err) {
			console.error('Error al recuperar los usuarios');
			res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});
		} else {
			console.log('Users recuperados:', users);
			res.render('users', {users: users});
		}
	});
};


/**
 * Get the user using his/her id.
 */
exports.loadUser = function(req, res) {
	var idUser = req.params.idUser;
	
	userService.loadUser(idUser, function(user, err) {
		if (err) {
			console.error('Error al recuperar los usuarios');
			res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});
		} else {
			console.log('User recuperado:', user);
			res.render('editUser', {user: user});
		}
	});
};


/**
 * Edit the user using his/her id.
 */
exports.editUser = function(req, res) {
	var idUser = req.params.idUser;
	var name = req.body.name;
	var email = req.body.email;
	
	userService.editUser(idUser, name, email, function(user, err) {
		if (err) {
			console.error('Error al editar los datos del usuario');
			res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});
		} else {
			console.log('User modificado:', user);
			res.render('editUser', {user: user});
		}
	});
};


/**
 * Delete the user using his/her id.
 */
exports.deleteUser = function(req, res) {
	var idUser = req.params.idUser;
	
	userService.deleteUser(idUser, function(err) {
		if (err) {
			console.error('Error al eliminar el usuario');
			res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});
		} else {
			console.log('User eliminado:', idUser);
            res.redirect('/users');
		}
	});
};


/**
 * Displays the form to create a new User.
 */
exports.newUser = function(req, res) {
	var user = {};
	
	res.render('newUser', {user: user});
};


/**
 * Creates a new User.
 */
exports.createUser = function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	
	userService.createUser(name, email, function(user, err) {
		if (err) {
			console.error('Error al crear el usuario');
			res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});
		} else {
			console.log('User creado:', user);
            res.redirect('/users');
		}
	});
};