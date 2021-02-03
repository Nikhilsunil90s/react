
const db = require("../models")
const Course = db.Course
const slugify = require('slugify')
const fs= require('fs')

exports.index= async (req, res) => {

    try{
        let course= await Course.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
        res.json(course);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.show= async (req, res) => {
    try{
        let course= await Course.findOne({ 
            where: { slug: req.params.slug } 
        })
        res.json(course);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.store= async (req, res) => {
    console.log(req.body)
    const slugedUrl= slugify(req.body.title)
    
    const course= new Course({
        title: req.body.title,
        description: req.body.description,
        slug: slugedUrl,
        trailer: req.files.trailer[0].filename,
        cover_photo: req.files.cover_photo[0].filename,
        fees: parseFloat(req.body.fees).toFixed(2)
    });

    try{
        await course.save();
        res.json({success: 'Course added successfully'})
    }catch(err){
        res.json({error: err.message});
    }

}

exports.update= async (req, res) => {

    let course 

    try{
        course= await Course.findByPk(req.params.id)
    }catch(err){
        res.json({msg: err.message})
        return
    }

    course.title= req.body.title
    course.description= req.body.description
    course.slug= slugify(req.body.title)
    course.fees= parseFloat(req.body.fees).toFixed(2)

    if(req.files.trailer){
        deleteMedia(course.trailer)
        course.trailer= req.files.trailer[0].filename
    }

    if(req.files.cover_photo){
        deleteMedia(course.cover_photo)
        course.cover_photo= req.files.cover_photo[0].filename
    }

    try{
        await course.save();
        res.json({success: 'Course edited'})
    }catch(err){
        res.json({error: err.message});
    }

}

exports.destroy= async (req, res) => {

    let course

    try{
        course= await Course.findByPk(req.params.id);
    }catch(err){
        res.json({error: err.message})
        return
    }

    try{
        await deleteMedia(course.trailer)
        await deleteMedia(course.cover_photo)
        await course.destroy()
        res.json({success: 'Course deleted'})
    }catch(err){
        res.json({msg: err.message});
    }
}

const deleteMedia= async (imageName) => {

    let path= "./public/uploads/"+imageName
    await fs.unlink(path, err => {
        
    })

}

