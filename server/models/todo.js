var mongoose = require('mongoose');

var Todo = mongoose.model('DataBaru', {   
    text : {
        type: String,
        required : true,
        minlength: 1,
        trim : false // trim false akan membuat spasi tetap ada
    }, 
    completed : {
        type: Boolean,
        default: false
    },
    completedAt : {
        type: Number,
        default: null
    }
});

module.exports = {Todo};