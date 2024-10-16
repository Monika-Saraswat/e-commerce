const express=require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const router=express.Router();
const {reviewValidate,isLoggedIn}=require('../middleware')


router.post('/products/:id/review',reviewValidate,isLoggedIn,async(req,res)=>{
    try{
    let {rating,comment}=req.body
    let {id}=req.params;
    const foundProduct=await Product.findById(id)
    const review=await Review.create({rating,comment})
    foundProduct.reviews.push(review);
    await review.save()
    await foundProduct.save();
    req.flash('success','Review added successfully')
    res.redirect(`/products/${id}`);
    }catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

router.delete('/:ide/review/:id',async(req,res)=>{
    try{
    // console.log(req.body)
    console.log(req.params);
    let {ide,id}=req.params;
    // console.log(ide);
    const foundProduct=await Product.findById(ide)
// 
await Product.findByIdAndUpdate(ide, {
    $pull: { reviews: id }
});

    await Review.findByIdAndDelete(id);
    
    res.redirect('/products');
}
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})


module.exports=router;