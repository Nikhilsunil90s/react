
const db = require("../models")
const Home = db.Home
const fs= require('fs')
const dbConfig = require ('../config/config.json')
var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig.development);
const { QueryTypes } = require('sequelize');

const count_query = `select   (SELECT count(*)  FROM Courses) as courses,(SELECT count(*)  FROM Blogs) as blogs,(SELECT count(*)  FROM Lessons) as lessions`;
exports.index= async (req, res) => {

    try{
        let home= await Home.findAll()
            res.json(home)
    } catch(err){
        res.json({error: err.message})
    }
}

exports.count= async (req, res) => {
    await sequelize.query(count_query, {type: QueryTypes.SELECT, raw: true})
    .then(async function(actions) {
        await res.send(actions)
    });
}       

exports.store= async (req, res) => {

    let home= await isExists()

    if(home !== false ){
        home.header_image= req.files.headerImage[0].filename
    }
    else{
     
        home= new Home({
            header_image: req.files.headerImage[0].filename
        })
    }

    try{
        await home.save();
        res.json({success: 'Header image added successfully'})
    }catch(err){
        res.json({error: err.message})
    }

}

const isExists= async () => {

    let item

    try{
        item= await Home.findOne()
    } catch(err){
        return false
    }

    if( item ){
        deleteMedia(item.header_image)
        return item
    }
    else
        return false
}

const deleteMedia= async (imageName) => {

    let path= "./public/uploads/"+imageName
    await fs.unlink(path, err => {
        
    })

}