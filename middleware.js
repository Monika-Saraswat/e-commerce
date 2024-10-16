const Product = require('./models/Product');
const {productSchema,reviewSchema}=require('./schema')


const productValidate=(req,res,next)=>{
    let {name,img,price,desc}=req.body;
    const {err}=productSchema.validate({name,img,price,desc})
    if(err){
        // console.log(error)
        return res.render('error',err)
    }
    next();
}

const reviewValidate=(req,res,next)=>{
    let {rating,comment}=req.body;
    const {err}=reviewSchema.validate({rating,comment})
    if(err){
        return res.render('error',err)
    }
    next();
}

const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','Please Login first')
        return res.redirect('/login')
    }
    next();
}

const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash('error','You dont have the permission')
        return res.redirect('/products')
    }
    if(req.user.role!=='seller'){
        req.flash('error','You dont have the permission')
        return res.redirect('/products')
    }
    next();
}

const isProductAuthor=async(req,res,next)=>{
   let {id}=req.params;
   const product=await Product.findById(id);
   if(!product.author.equals(req.user._id)){
    req.flash('error','You dont have the permission')
    return res.redirect('/products')
   }
   next()
}

module.exports={isSeller,isProductAuthor,productValidate,isLoggedIn,reviewValidate}