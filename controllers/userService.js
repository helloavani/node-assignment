var ObjectID = require("mongodb").ObjectID;
const User = require('../models/user');

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
  };
  
  // Response handling
  let response = {
    status: 200,
    data: [],
    message: null
  };

exports.addUser = async function(req,res){
    if(req.body){
        var newUser = new User({
            phoneNo : req.body.phoneNumber,  
             });
          // save the user with unique no. 
            newUser.save(function(err,result) {
               if (err) {
                 return res.send({success: false, msg: 'User already exists.'});
                }
               res.send({success: true, msg: 'Successful created new user.'});
             });
            }else{
                res.send("phone no required")
            }
}