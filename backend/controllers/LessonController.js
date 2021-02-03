
const db = require("../models")
const Lesson = db.Lesson
const fs= require('fs')
const { getVideoDurationInSeconds } = require('get-video-duration')

exports.index= async (req, res) => {
    try{
        let lesson= await Lesson.findAll({
            where: { courseId: req.params.id }
        })
        res.json(lesson);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.indexAll= async (req, res) => {

    let lesson

    try{
        if(req.body.filterBy == 'All'){
            lesson= await Lesson.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
        }
        else{
            lesson= await Lesson.findAll({
                where: { courseId: req.body.filterBy },
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
        }
        res.json(lesson);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.store= async (req, res) => {

    duration= await videoDuration(req.files.video[0].filename)
    
    const lesson= new Lesson({
        title: req.body.title,
        description: req.body.description,
        thumbnail: req.files.thumbnail[0].filename,
        video: req.files.video[0].filename,
        duration: duration,
        courseId: parseInt(req.body.courseId),
    });

    try{
        await lesson.save();
        res.json({success: 'Lesson added successfully'})
    }catch(err){
        res.json({error: err.message});
    }
}

exports.update= async (req, res) => {

    let lesson 

    try{
        lesson= await Lesson.findByPk(req.params.id)
    }catch(err){
        res.json({msg: err.message})
        return
    }

    lesson.title= req.body.title
    lesson.description= req.body.description
    lesson.courseId= parseInt(req.body.courseId)

    if(req.files.thumbnail){
        deleteMedia(lesson.thumbnail)
        lesson.thumbnail= req.files.thumbnail[0].filename
    }

    if(req.files.video){
        deleteMedia(lesson.video)
        lesson.video= req.files.video[0].filename
        duration= await videoDuration(req.files.video[0].filename)
        lesson.duration= duration
    }

    try{
        await lesson.save();
        res.json({success: 'Lesson edited'})
    }catch(err){
        res.json({error: err.message});
    }

}

exports.destroy= async (req, res) => {

    let lesson

    try{
        lesson= await Lesson.findByPk(req.params.id);
    }catch(err){
        res.json({error: err.message})
        return
    }

    try{
        await deleteMedia(lesson.thumbnail)
        await deleteMedia(lesson.video)
        await lesson.destroy()
        res.json({success: 'Lesson deleted'})
    }catch(err){
        res.json({msg: err.message});
    }
}

const deleteMedia= async (imageName) => {

    let path= "./public/uploads/"+imageName
    await fs.unlink(path, err => {
        
    })

}

const videoDuration= async (video) => {
    const secs= await getVideoDurationInSeconds("./public/uploads/"+video)
    const duration= secondsToTime(secs)
    return duration
}

const secondsToTime= (secs) =>
{
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var time= hours+":"+minutes+":"+seconds

    return time;
}