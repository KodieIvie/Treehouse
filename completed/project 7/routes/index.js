const express = require('express');
const router = express.Router();
const Twit = require('twit');
const config = require('../config/config');
const bodyParser = require('body-parser');
const moment = require('moment');

// twitter connect
const T = new Twit(config)

// GET /
router.get('/', function(req, res, next) {
	
	Promise.all([
            T.get('account/verify_credentials'),
            T.get('friends/list', { count: 5 }),
            T.get('statuses/home_timeline', { count: 5 }),
            T.get('direct_messages/sent', { count: 5 })
        ]).then(([
                userInfo,
                friendsList,
                userTimeline,
                sentMessages
        ]) => {
            const data = {
                userInfo: userInfo.data,
                friendsList: friendsList.data,
                timeline: userTimeline.data,
                messages: sentMessages.data,
                moment: moment
	        }

		    res.render('index', {title: 'My Twitter Clone', data: data });
        }).catch( err => {
        	next(err)
        })
});

// POST
router.post('/', function(req, res, next) {
	if (req.body.msg) {
		T.post('statuses/update', { status: req.body.msg }, function(err, data, response) {
			if (err){
				return next(err);
			}
            res.redirect('/');
		})
	}
});


module.exports = router;
