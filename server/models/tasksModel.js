const mongoose = require("mongoose")
const { Schema } = mongoose

const taskSchema = new Schema({
    name:String,
    tasks:String,
    img:
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = Tasks = mongoose.model('tasks', taskSchema)
