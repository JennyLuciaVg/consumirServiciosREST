var http = require('http');

/**
 * Carga de los parámetros genéricos del servicio RESTful
 */
var host = 'localhost';
var port = '4567';

/**
 * Función encargada de recuperar todos los usuarios.
 */
exports.loadUsers = function(next) {
	var path = '/users';
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'GET',
		encoding: null
	};
	
	// Se invoca el servicio RESTful con las opciones configuradas previamente y sin objeto JSON.
	invocarServicio(options, null, function (users, err) {
		if (err) {
			next(null, err);
		} else {
			next(users, null);
		}
	});
};

/**
 * Función encargada de recuperar los datos de un usuario a partir de su id.
 */
exports.loadUser = function(idUser, next) {
	var path = '/users/' + idUser;
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'GET',
		encoding: null
	};
	
	// Se invoca el servicio RESTful con las opciones configuradas previamente y sin objeto JSON.
	invocarServicio(options, null, function (user, err) {
		if (err) {
			next(null, err);
		} else {
			next(user, null);
		}
	});
};

/**
 * Función encargada de modificar los datos del usuario.
 */
exports.editUser = function(idUser, name, email, next) {
	var path = '/users/' + idUser;
	// var path = '/users/' + idUser + '?name=' + name + '&email=' + email;
	
	var userData = JSON.stringify({
		"name" : name,
		"email" : email
	});
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'PUT',
		encoding: null
	};
	
	// Se invoca el servicio RESTful con las opciones configuradas previamente y sin objeto JSON.
	invocarServicio(options, userData, function (user, err) {
		if (err) {
			next(null, err);
		} else {
			next(user, null);
		}
	});
};

/**
 * Función encargada de eliminar un usuario por su id.
 */
exports.deleteUser = function(idUser, next) {
	var path = '/users/' + idUser;
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'DELETE',
		encoding: null
	};
	
	// Se invoca el servicio RESTful con las opciones configuradas previamente y sin objeto JSON.
	invocarServicio(options, null, function (user, err) {
		next(err);
	});
};

/**
 * Función encargada de crear un nuevo usuario con los datos dados.
 */
exports.createUser = function(name, email, next) {
	var path = '/users';
	// var path = '/users?name=' + name + '&email=' + email;
	
	var userData = JSON.stringify({
		"name" : name,
		"email" : email
	});
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'POST',
		encoding: null
	};
	
	// Se invoca el servicio RESTful con las opciones configuradas previamente y sin objeto JSON.
	invocarServicio(options, userData, function (user, err) {
		if (err) {
			next(null, err);
		} else {
			next(user, null);
		}
	});
};



/**
 * Función encargada de invocar los servicios RESTful y devolver
 * el objeto JSON correspondiente.
 */
function invocarServicio(options, jsonObject, next) {
	var req = http.request(options, function(res) {
		var contentType = res.headers['content-type'];
		
		/**
		 * Variable para guardar los datos del servicio RESTfull.
		 */ 
		var data = '';

		res.on('data', function (chunk) {
			// Cada vez que se recojan datos se agregan a la variable
			data += chunk;
		}).on('end', function () {
			// Al terminar de recibir datos los procesamos
			var response = data;
			
			// Nos aseguramos de que sea tipo JSON antes de convertirlo.
			if (contentType.indexOf('application/json') != -1) {
				response = JSON.parse(data);
			}
			
			// Invocamos el next con los datos de respuesta
			next(response, null);
		})
		.on('error', function(err) {
			// Si hay errores los sacamos por consola
			console.error('Error al procesar el mensaje: ' + err)
		})
		.on('uncaughtException', function (err) {
			// Si hay alguna excepción no capturada la sacamos por consola
			console.error(err);
		});
	}).on('error', function (err) {
		// Si hay errores los sacamos por consola y le pasamos los errores a next.
		console.error('HTTP request failed: ' + err);
		next(null, err);
	});
	
	// Si la petición tiene datos estos se envían con la request
	if (jsonObject) {
		req.write(jsonObject);
	}
	
	req.end();
};