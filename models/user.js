
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNo: { 
        type: Number,
        unique: true,
        trim: true,
        required: true,
    },
    
    }, { timestamps: true },{usePushEach: true});

const User = mongoose.model('User', userSchema);

module.exports = User;