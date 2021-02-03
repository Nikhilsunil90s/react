const db = require("../models")
const ProfileInfo = db.ProfileInfo
const fs= require('fs')

exports.show= async (req, res) => {

    let item

    try{
        item= await ProfileInfo.findOne({ 
            where: { email: req.params.email } 
        })
        res.json(item)
    } catch(err){
        res.json(item)
    }
}

exports.store= async (req, res) => {

    let profile= await isExists(req.body.email)

    if(profile !== false){
        profile.image= req.files.proPic[0].filename
    }
    else{

        profile= new ProfileInfo({
            email: req.body.email,
            image: req.files.proPic[0].filename,
        })
    }

    try{
        await profile.save();
        res.json({success: 'Profile picture uploaded successfully'})
    }catch(err){
        res.json({error: err.message})
    }

}

const isExists= async (email) => {

    let item

    try{
        item= await ProfileInfo.findOne({ 
            where: { email: email } 
        })
    } catch(err){
        return false
    }

    if( item !== null ){
        deleteMedia(item.image)
        return item
    }
    else
        return false
}

const deleteMedia= async (imageName) => {

    let path= "../frontend/public/media/images/"+imageName
    await fs.unlink(path, err => {
        
    })

}