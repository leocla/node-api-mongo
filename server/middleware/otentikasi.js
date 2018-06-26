var {UserData} = require('./../models/user');

// MIDDLEWARE FUNCTION
var otentikasi = (req, res, next) => {
    var token = req.header('x-auth');
    UserData.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        //res.send(user); 
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
         res.status(401).send();
    });
};

module.exports = {
    otentikasi
}