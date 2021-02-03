
const db = require("../models")
const Category = db.Category
const slugify = require('slugify')
const fs= require('fs')

exports.index= async (req, res) => {

    try{
        let category= await Category.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
        res.json(category);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.show= async (req, res) => {
    try{
        let category= await Category.findOne({ 
            where: { slug: req.params.slug } 
        })
        res.json(category);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.store= async (req, res) => {
    const category= new Category({
        title: req.body.title
    });
    try{
        await category.save();
        res.json({success: 'Category added successfully'})
    }catch(err){
        res.json({error: err.message});
    }
}

exports.update= async (req, res) => {
    let category 
    console.log(req.params.id);
    try{
        category= await Category.findByPk(req.params.id)
    }catch(err){
        res.json({msg: err.message})
        return
    }
    category.title= req.body.title
    try{
        await category.save();
        res.json({success: 'Category edited'})
    }catch(err){
        res.json({error: err.message});
    }

}

exports.destroy= async (req, res) => {
    let category
    try{
        category= await Category.findByPk(req.params.id);
    }catch(err){
        res.json({error: err.message})
        return
    }
    try{
        await category.destroy()
        res.json({success: 'Category deleted'})
    }catch(err){
        res.json({msg: err.message});
    }
}

