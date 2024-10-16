const express=require('express')
const Product=require('../models/Product')
const Review = require('../models/Review')
const router=express.Router()
const {productValidate,isLoggedIn,isSeller, isProductAuthor}=require('../middleware')



router.get('/products',isLoggedIn,async(req,res)=>{
    try{
    let products=await Product.find({})
    res.render('products/index',{products})
    }catch(e){
        console.log(e.message)
        res.status(500).render('error',{err:e.message})
    }
})

router.get('/product/new',isSeller,isLoggedIn,(req,res)=>{
    try{
    res.render('products/new')
    }catch(e){
        console.log(e.message)
        res.status(500).render('error',{err:e.message})
    }
})

router.post('/products', productValidate,isLoggedIn,isSeller, async(req,res)=>{
    try{

    let {name,img,price,desc}=req.body;
    // console.log(req.body)
    await Product.create({name,img,price,desc,author:req.user._id})
    req.flash('success','product added successfully ')
    res.redirect('/products')
    }catch(e){
        console.log(e.message)
        res.status(500).render('error',{err:e.message})
    }

})

router.get('/products/:id',isLoggedIn,async(req,res)=>{
    try{
    let {id}=req.params;
    let foundProduct=await Product.findById(id).populate('reviews')
    res.render('products/show',{foundProduct})
    }catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    try{
    let {id}=req.params;
    let foundProduct=await Product.findById(id)
    res.render('products/edit',{foundProduct})
    }catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

router.patch('/products/:id',productValidate,isLoggedIn,async(req,res)=>{
    try{
    let {id}=req.params;
    let {name,img,price,desc}=req.body;
    let foundProduct=await Product.findByIdAndUpdate(id,{name,img,price,desc});
    req.flash('success','product edited successfully ')
    res.redirect(`/products/${id}`);
    }catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

router.delete('/products/:id',isLoggedIn,isProductAuthor,async(req,res)=>{
    try{
    let {id}=req.params;
    const product=await Product.findById(id);
    // for(let id of product.reviews){
    //     await Review.findByIdAndDelete(id);
    // }
    await Product.findByIdAndDelete(id);
    req.flash('success','product deleted successfully ')
    res.redirect('/products');
    }catch(e){
        // console.log(e.message)
        const err=e.message
        res.status(500).render('error',err)
    }
})


module.exports=router