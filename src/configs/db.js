const mongoose = require("mongoose")

module.exports = () => {
    return mongoose.connect("mongodb+srv://siraj:siraj123@cluster.dvuce.mongodb.net/unitc4?retryWrites=true&w=majority")
}