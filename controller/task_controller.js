module.exports.getAllTasks = async function(req,res){
    try{
        return res.status(200).json({
            message:"done"
        })
    }
    catch(err){
        return res.status(400).json({
            message:"error"
        })
    }
}