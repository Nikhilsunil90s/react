
const db = require("../models")
const Enroll = db.Enroll
const Course = db.Course

exports.index= async (req, res) => {
    try{
        let enrolls= await Enroll.findAll({
            where: { email: req.params.email },
            order: [
                ['createdAt', 'DESC'],
            ],
        })
        res.json(enrolls)
    } catch(err){
        res.json({msg: err.message})
    }
}

exports.store= async (req, res) => {

    const course= await getCourseTitle(req.body.course_id)
    
    const enroll= new Enroll({
        course_id: req.body.course_id,
        course_title: course.dataValues.title,
        email: req.body.email,
    })

    try{
        await enroll.save();
        res.json({success: 'Enroll added successfully'})
    }catch(err){
        res.json({error: err.message})
    }

}

exports.show= async (req, res) => {
    try{
        let enroll= await Enroll.findOne({ 
            where: { course_id: req.body.course_id, email: req.body.email } 
        })
        
        if( enroll !== null )
            res.json({success: 'item exists'})
        else
            res.json({error: err.message})
    } catch(err){
        res.json({error: err.message})
    }
}

const getCourseTitle= async (id) => {
    try{
        let course= await Course.findOne({ 
            where: { id: id } 
        })
        return(course)
    } catch(err){
        
    }
}
