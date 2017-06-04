var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    moderation: Boolean,
    title:String,
    content: String,
    source: [String],
    created: {type: Date, default: Date.now},
    category: String,

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscriber'
    },
    tracker: [{
            stars: Number,
            favBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subscriber'
            }
        }]

});
var Article = mongoose.model('Article', articleSchema);


module.exports = Article;
