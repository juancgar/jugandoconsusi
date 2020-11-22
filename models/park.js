const mongoose = require('mongoose');

const schema = mongoose.Schema;

let parkSchema = new schema ({

    name : {type: String},
    url : {type: String},
    direccion: {type:String},
    eventKey : [{type: mongoose.Schema.Types.ObjectId, ref:"events"}]

},{collection: "park"});

module.exports = mongoose.model("park",parkSchema);