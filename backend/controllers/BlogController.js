
const db = require("../models")
const Blog = db.Blog
const Category = db.Category
const Author = db.Author
const slugify = require('slugify')
const fs= require('fs')    
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.index= async (req, res) => {    
    try{
        let type = req.body.type;
        let filterBy = req.body.id;
        //let startDate = req.body.startDate;
        //let endDate = req.body.endDate;
        let where;
        if(type == "1") {    
            if (filterBy == "All" || filterBy == "") {
                where = {
                    isFeatured: false
                }    
            } else {
                where = {
                    isFeatured: false,
                    category: filterBy
                }    
            }
        } else if(type == "2") {
            if (filterBy == "All" || filterBy == "") {
                where = {
                    isFeatured: false
                }    
            } else {
                where = {
                    isFeatured: false,
                    author: filterBy
                }    
            }
        } else if(type == "3") {
            if (filterBy == "All" || filterBy == "") {
                where = {
                    isFeatured: false
                }    
            } else {    
                where = {
                    isFeatured: false,
                    id: filterBy
                }    
            }
        } else if(type == "4") {
            if (filterBy == "All" || filterBy == "") {
                where = {
                    isFeatured: false
                }    
            } else {
                where = {
                    isFeatured: false,
                    author: filterBy
                }    
            }
        }
        Category.hasMany(Blog, {foreignKey: 'id'});
        Blog.belongsTo(Category, {foreignKey: 'category'});

        Author.hasMany(Blog, {foreignKey: 'id'});
        Blog.belongsTo(Author, {foreignKey: 'author'});

        let blog= await Blog.findAll({
            where: where,    
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [Category,Author]    
        })
        
        res.json(blog);    
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.recent= async (req, res) => {    
    try{
        let where;
        where = {
            isFeatured : false,
        }   
        Category.hasMany(Blog, {foreignKey: 'id'});
        Blog.belongsTo(Category, {foreignKey: 'category'});

        Author.hasMany(Blog, {foreignKey: 'id'});
        Blog.belongsTo(Author, {foreignKey: 'author'});

        let blog= await Blog.findAll({ 
            where: where,    
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 3,
            include: [Category,Author]    
        })
        
        res.json(blog);    
    } catch(err){
        res.json({msg: err.message});
    }
}


exports.archive= async (req, res) => {    
    try{
        let where;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        console.log(startDate);   
        console.log(endDate);

        where = {
            isFeatured : false,
            createdAt : {
                [Op.between]: [startDate, endDate]
            }  
        }     

        let blog= await Blog.findAll({ 
            where: where,    
            order: [
                ['createdAt', 'DESC'],
            ]
        })
        
        res.json(blog);    
    } catch(err){
        res.json({msg: err.message});
    }
}


exports.indexCategories= async (req, res) => {

    try{
        let categories= await Blog.findAll({
            where: { isFeatured: false },
            attributes: ['category'],
            group: ['category']
        })
        res.json(categories);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.indexAuthors= async (req, res) => {

    try{
        let authors= await Blog.findAll({
            where: { isFeatured: false },
            attributes: ['author'],
            group: ['author']
        })
        res.json(authors);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.indexFeatured= async (req, res) => {

    try{
        let blog= await Blog.findAll({
            where: { isFeatured: true },
            order: [
                ['updatedAt', 'ASC'],
            ],
        })
        res.json(blog);
    } catch(err){
        res.json({msg: err.message});
    }
}

exports.show= async (req, res) => {
    try{
        let blog= await Blog.findOne({ 
            where: { slug: req.params.slug } 
        })
        res.json(blog)
    } catch(err){
        res.json({error: err.message})
    }
}

exports.store= async (req, res) => {

    const slugedUrl= slugify(req.body.title)
    
    const blog= new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        isFeatured: req.body.isFeatured,
        category: req.body.category,
        slug: slugedUrl,
        mainImg: req.files.mainImg[0].filename,
    });

    if(req.body.isFeatured === 'true'){
        await removeOldestFeatured()
    }

    try{
        await blog.save();
        res.json({success: 'Post created successfully'})
    }catch(err){
        res.json({error: err.message})
    }

}

exports.update= async (req, res) => {

    let blog 

    try{
        blog= await Blog.findByPk(req.params.id)
    }catch(err){
        res.json({msg: err.message})
        return
    }

    blog.title= req.body.title
    blog.content= req.body.content
    blog.author= req.body.author
    blog.category= req.body.category,
    blog.slug= slugify(req.body.title)

    if(req.files.mainImg){
        deleteMedia(blog.mainImg)
        blog.mainImg= req.files.mainImg[0].filename
    }

    if(req.body.isFeatured === 'true' && blog.isFeatured === false){
        removeOldestFeatured()
    }

    blog.isFeatured= req.body.isFeatured

    try{
        await blog.save();
        res.json({success: 'Post edited'})
    }catch(err){
        res.json({error: err.message})
    }

}

exports.destroy= async (req, res) => {

    let blog

    try{
        blog= await Blog.findByPk(req.params.id);
    }catch(err){
        res.json({error: err.message})
        return
    }

    try{
        await deleteMedia(blog.mainImg)
        await blog.destroy()
        res.json({success: 'Post deleted'})
    }catch(err){
        res.json({msg: err.message})
    }
}

const deleteMedia= async (imageName) => {

    let path= "./public/uploads/"+imageName
    await fs.unlink(path, err => {
        
    })

}

const removeOldestFeatured= async(req,res) => {


    let blogs
    
    try{
        blogs= await Blog.findAndCountAll({
            where: { isFeatured: true }
        })
    } catch( err){
        res.json({msg: err.message})
    }

    if(blogs.count >= 3){
        let blog

        try{
            blog= await Blog.findOne({ 
                where: { isFeatured: true },
                order: [
                    ['updatedAt', 'ASC'],
                ],
            })
        } catch(err){
            res.json({msg: err.message})
        }
    
        blog.isFeatured= false

        try{
            await blog.save()
        }catch(err){
            res.json({msg: err.message})
        }
    }
}
