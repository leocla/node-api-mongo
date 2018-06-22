var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoAplikasi');

var SkemaBaru = mongoose.model('DataBaru', {   
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

var DataHore = new SkemaBaru({
    text: 23
});

DataHore.save().then((hore) => {
    console.log(JSON.stringify(hore, undefined, 2));
}, (err) => {
    console.log('GAGAL BRO>>>> menyimpan gagal~!', err);
});