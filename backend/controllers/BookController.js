
const db = require("../models")
const Books = db.Books
const fs= require('fs')

exports.index= async (req, res) => {

    try{
        let book= await Books.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
        res.json(book);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.show= async (req, res) => {
    try{
        let book= await Books.findOne({ 
            where: { title: req.params.slug } 
        })
        res.json(book);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.detail= async (req, res) => {
    //console.log(req.params.id);
    try{
        let book= await Books.findOne({ 
            where: { id: req.params.id } 
        })
        res.json(book);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.store= async (req, res) => {
    
    const book= new Books({
        title: req.body.title, 
        content: req.body.content,
        buy_link: req.body.buy_link,
        cover_photo: req.files.cover_photo[0].filename,
        price: parseFloat(req.body.price).toFixed(2)
    });

    try{
        await book.save();
        res.json({success: 'Book added successfully'})
    }catch(err){
        res.json({error: err.message});
    }

}

exports.update= async (req, res) => {

    let book 

    try{
        book= await Books.findByPk(req.params.id)
    }catch(err){
        res.json({msg: err.message})
        return
    }

    book.title= req.body.title
    book.price= parseFloat(req.body.price).toFixed(2)
    book.content= req.body.content
    book.buy_link= req.body.buy_link  

    if(req.files.cover_photo){
        deleteMedia(book.cover_photo)
        book.cover_photo= req.files.cover_photo[0].filename
    }

    try{
        await book.save();
        res.json({success: 'Book edited'})
    }catch(err){
        res.json({error: err.message});
    }

}

exports.destroy= async (req, res) => {

    let book

    try{
        book= await Books.findByPk(req.params.id);
    }catch(err){
        res.json({error: err.message})
        return
    }

    try{
        await deleteMedia(book.cover_photo)
        await book.destroy()
        res.json({success: 'Book deleted'})
    }catch(err){
        res.json({msg: err.message});
    }
}

const deleteMedia= async (imageName) => {

    let path= "./public/uploads/"+imageName
    await fs.unlink(path, err => {
        
    })

}

