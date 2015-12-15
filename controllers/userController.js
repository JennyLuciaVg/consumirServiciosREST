var userService = require('../services/userService');

/**
 * Función encargada de mostrar los usuarios de la aplicación.
 */
exports.listarUsers = function(req, res) {
	// Se recuperan los usuarios utilizando el servicio userService
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