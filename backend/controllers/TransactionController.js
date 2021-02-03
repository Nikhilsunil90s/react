
const db = require("../models")
const Transaction = db.Transaction

exports.index= async (req, res) => {


    try{
        let transaction= await Transaction.findAll({
            offset: req.body.transactionOffset, limit: 5,
            order: [
                ['createdAt', 'DESC'],
            ],
        })
        res.json(transaction)
    } catch(err){
        res.json({msg: err.message})
    }
}

exports.store= async (req, res) => {
    
    const transaction= new Transaction({
        username: req.body.username,
        email: req.body.email,
        course: req.body.course,
        fees: req.body.fees,
    })

    try{
        await transaction.save();
        res.json({success: 'Transaction added successfully'})
    }catch(err){
        res.json({error: err.message})
    }

}
