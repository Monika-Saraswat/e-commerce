const express=require('express')
const app=express()
const path=require('path')
const port=8080;
const mongoose=require('mongoose');
const seedDB=require('./seed')
const productRoute=require('./routes/product')
const reviewRoute=require('./routes/review')
const authRoute=require('./routes/auth')
const cartRoute=require('./routes/cart')
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override')
const session=require('express-session')
const flash=require('connect-flash')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require('./models/User')
const db = require('./config/key').MongoURI;


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log("DB Connected")})
.catch((err)=>{
    console.log("DB error")
    console.log(err)}
);


app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

let configSession={
    secret: 'monika saraswat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly:true,
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
  }

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session(configSession))

app.use(passport.initialize())
app.use(passport.session())



// passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use((req,res,next)=>{
    res.locals.currentUser=req.user
    // console.log(req.user)
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next();
})

app.use(productRoute);
app.use(reviewRoute)
app.use(authRoute)
app.use(cartRoute)

// seedDB();

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(port,()=>{
    console.log(`server conneccted at port ${port}`)
})