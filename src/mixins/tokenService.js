import jwt from 'jsonwebtoken';
var localConfig = require('../../config/local.js');
var secret = localConfig.secret;

export default {
	methods: {
		verifyToken: function(token) {
			jwt.verify(token, secret, function(err, decoded){
		    if(err){
		      return {isErr: true, err: err};
		    }else{
		      return {isErr: false, decoded: decoded};
		    }
		  });
		},
	}
}