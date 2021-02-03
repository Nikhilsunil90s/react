
const db = require("../models")
const Page = db.Page
const {Op} = require('sequelize')



exports.index= async (req, res) => {
    
    try{
        let page= await Page.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
        res.json(page);
    } catch(err){
        res.json({error: err.message});
    }
}

exports.show= async (req, res) => {

    const isNum= isNumeric(req.params.id)


    let page

    try{
        if(isNum){
            page= await Page.findOne({ 
                where: { id: req.params.id } 
            })
        }
        else{
            page= await Page.findOne({ 
                where: { url: '/' +req.params.id } 
            })  
        }
        res.json(page);
    } catch(err){
        res.json({error: err.message});
    }
}

exports.store= async (req, res) => {
    console.log(req.body)

    

    try{
        pageExists= await Page.findOne({ 
            where: { url: req.body.url } 
        })
    
    
        if(pageExists) {
           return res.json({error: 'page url already exists'});
        }
    
        const page= new Page({
            title: req.body.title,
            url: req.body.url,
            description: req.body.description,
            content: req.body.content,
        });

        await page.save();
        res.json({success: 'Page Created successfully'})
    }catch(err){
        res.json({error: err.message});
    }

}

exports.update= async (req, res) => {

    let page 

    try{
        page= await Page.findByPk(req.params.id)
    }catch(err){
        res.json({error: err.message})
        return
    }
   
  
    try{
        pageExists= await Page.findOne({ 
            where: { url: req.body.url , [Op.not]: [{id:  req.params.id}] } 
        })
    
    
        if(pageExists) {
           return res.json({error: 'page url already exists'});
        }
        
    
        page.title= req.body.title
        page.url = req.body.url
        page.description= req.body.description
        page.content = req.body.content

        
        await page.save();
        res.json({success: 'Page edited'})
    }catch(err){
        res.json({error: err.message});
    }

}



exports.destroy= async (req, res) => {

    let page

    try{
        page= await Page.findByPk(req.params.id);
    }catch(err){
        res.json({error: err.message})
        return
    }

    try{
        await page.destroy()
        res.json({success: 'Page deleted'})
    }catch(err){
        res.json({error: err.message});
    }
}

const isNumeric= (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
