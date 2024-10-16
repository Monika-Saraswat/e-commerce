const mongoose=require('mongoose')
const Review=require('./Review')
const User=require('./User')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,

    },
    img:{
        type:String,
        trim:true,
        // required:true,
        // default:
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    desc:{
        type:String,
        trim:true
    },
    avgRating:{
        type:Number,
        default:0
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

productSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

let Product=mongoose.model('Product',productSchema)
module.exports=Product