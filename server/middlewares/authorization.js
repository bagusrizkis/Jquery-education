const { Movie } = require('../models');

function authorization(req,res,next) {
	const id = req.params.id;
	Movie.findOne({
		where: { id }
	})
	.then(data => {
		if (data) {
			if (data.UserId == req.loggedUser.id) {
				next();
			} else {
				next({
					name: 'Unauthorized', 
					msg: 'Not authorized'
				});
			}
		}else {
			next({
				name: 'NotFound', 
				msg: 'Movie not found'
			});
		}
	})
	.catch(next);
}

module.exports = { authorization };
