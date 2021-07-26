const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

function authentication(req, res, next) {
	const token = verifyToken(req.headers.access_token);
		
	User.findByPk(token.id)
	.then(user => {
		if (user) {
			req.loggedUser = token;
			return next();
		} else {
			return next({
				name: 'Unauthorized', 
				msg: 'Authentication failed'
			});
		}
	})
	.catch(next);
}

module.exports = { authentication };
