const Tasks = require('../models/tasksModel')

module.exports.get = async (req,res) =>{
    const result = await Tasks.find({}).catch(err => console.log(err))
    res.json(result)
}

module.exports.getOne = async (req,res) =>{
    const { id } = req.params
    const result = await Tasks.find({_id:id}).catch(err => console.log(err))
    res.json(result)
}

module.exports.update = async (req,res) =>{
    const { id } = req.params
    const {name, tasks} = req.body
    await Tasks.updateOne({_id:id}, {name, tasks}).catch(err => console.log(err))
    res.json({result:"updated"})
}

module.exports.post = async (req,res) =>{
    const { name, tasks, img } = req.body
    const newTasks = new Tasks({
        name,
        tasks,
        img
    })
    const result = await newTasks.save().catch(err => console.log(err))
    res.json(result)
}

module.exports.deleteOne = async (req,res) =>{
    const { id } = req.params
    await Tasks.deleteOne({_id:id}).catch(err => console.log(err))
    res.json({result:"Deleted"})
}