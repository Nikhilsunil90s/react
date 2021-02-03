
const db = require("../models")
const Author = db.Author
const slugify = require('slugify')
const fs= require('fs')

exports.index= async (req, res) => {

    try{
        let author= await Author.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
        res.json(author);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.show= async (req, res) => {
    try{
        let author= await Author.findOne({ 
            where: { slug: req.params.slug } 
        })
        res.json(author);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.store= async (req, res) => {
    console.log(req.body.title);  
    const author= new Author({
        title: req.body.title
    });  
    try{
        await author.save();
        res.json({success: 'Author added successfully'})
    }catch(err){
        res.json({error: err.message});
    }
}

exports.update= async (req, res) => {
    let author 
    try{
        author= await Author.findByPk(req.params.id)
    } catch(err) {
        res.json({msg: err.message})
        return
    }          
    author.title= req.body.title
    try{
        await author.save();
        res.json({success: 'Author edited'})
    }catch(err){
        res.json({error: err.message});
    }

}

exports.destroy= async (req, res) => {
    let author
    try{
        author= await Author.findByPk(req.params.id);
    }catch(err){
        res.json({error: err.message})
        return
    }
    try{
        await author.destroy()
        res.json({success: 'Author deleted'})
    }catch(err){
        res.json({msg: err.message});
    }
}

