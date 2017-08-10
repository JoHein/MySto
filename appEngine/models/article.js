var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    moderation: Boolean,
    title:{type:String,required:true},
    content: {type:String,required:true},
    source: [String],
    created: {type: Date},
    category: {type:String,required:true},

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscriber',
        required: true

    },
    tracker: {
            stars: Number,
            favBy: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subscriber'
            }]
        }

});
var Article = mongoose.model('Article', articleSchema);


module.exports = Article;
