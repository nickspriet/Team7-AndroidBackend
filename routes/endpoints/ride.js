
var RideController = require('../../controllers/RideController');

var errResponse = function (res) {
  return function (err) {
    console.error(err);
    res.status(500);
    return res.send({
      statusCode: 500,
      message: 'Failed to get rides',
      error: err
    });
  };
};


/**
 * Get the rides for the authenticated user
 * @param {String} token AccessToken
 */
exports.getRides = function (req, res) {
  RideController.getRides(req.query.token, function (err, rides) {
    if (err) return errResponse(res)(err);
    res.send({
      statusCode: 200,
      message: 'OK',
      data: {
        rides: rides
      }
    });
  });
};




/**
 * Create a new Ride from an Event and User id
 * @param {String} eventId The id for the event
 * @param {String} token Our token
 */
exports.create = function (req, res) {
	RideController.createFromEvent(req.body.token, req.body.eventId, function(err, ride) {
		if (err) return errResponse(res)(err);

		return res.send({
			statusCode: 200,
      message: 'OK',
			data: {
				ride: ride
			}
		});
	});
};
