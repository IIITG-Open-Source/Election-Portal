const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const SALT_FACTOR = 10


const AuthSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    status : {
        type : String,
        default : 'pending'
    }

    // confirmationCode : {
    //     type : String,
    //     unique : true
    // }

})

AuthSchema.pre('save', function(next) {
    const user = this;
    
    if(!user.isModified('password')){
        return next();
        
    }

    console.log('done1');
    bcrypt.genSalt(SALT_FACTOR, function(err,salt){
        if(err) return next(err);
        console.log('done2');
        bcrypt.hash(user.password,salt,function(err,hash) {
            user.password = hash;
            console.log('done3');
            next();
        })
    })
})

AuthSchema.methods.comparePassword = function(candidatePassword , cb){
    const user = this;
    bcrypt.compare(candidatePassword,user.password, (err,isMatch) => {
        if(err) return cb(err);
        cb(null,isMatch)
    })
}










module.exports = mongoose.model('Auth',AuthSchema)
