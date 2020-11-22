const mongoose = require('mongoose');

const schema = mongoose.Schema;

let eventsSchema = new schema ({

    title : {type: String},
    start: {type:String},
    owner: {type:String},
    numPersonas: {type:Number},
    time: {type:Number}
},{collection: "events"});

module.exports = mongoose.model("events",eventsSchema);