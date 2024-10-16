const mongoose=require('mongoose')
const Product=require('./models/Product')

const products=[
    {
        name:"iphone",
        img:"https://th.bing.com/th/id/OIP.X_ETcvC9K8KzWjz81CwjggHaHa?rs=1&pid=ImgDetMain",
        price:150000,
        desc:"costly but accha h"
    },{
        name:"macbook",
        img:"https://th.bing.com/th/id/OIP.3D10CGvG0wNq1zH2GzRiEQAAAA?rs=1&pid=ImgDetMain",
        price:200000,
        desc:"looking good"
    },{
        name:"airpods",
        img:"https://th.bing.com/th?id=OSK.mmcolfUTszr5CG2Ur1iVPMj2D_Zcxfg2JdW-0wQsQ0CKuNGk&w=130&h=100&c=8&o=6&dpr=1.3&pid=SANGAM",
        price:20000,
        desc:"mast h"
    },{
        name:"watch",
        img:"https://th.bing.com/th?q=Apple+Watch+Women&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
        price:10000,
        desc:"pretty good"
    }
]

async function seedDB(){
    await Product.insertMany(products)
    console.log("Data seeded succesfully")
}

module.exports=seedDB;
