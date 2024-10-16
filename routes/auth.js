const express=require('express');
const User = require('../models/User');
const passport = require('passport');
const router=express.Router()

router.get('/register',(req,res)=>{
    try{
    res.render('auth/signup');
    }catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

router.post('/register',async(req,res)=>{
    try {
        let { email, username, password, role } = req.body;
        const existingUserByEmail = await User.findOne({ email });
        const existingUserByUsername = await User.findOne({ username });

        if (existingUserByEmail || existingUserByUsername) {
            req.flash('error', 'Email or Username already exists. Please choose another.');
            return res.redirect('/register');
        }

        const user = new User({ email, username, role });
        const newUser = await User.register(user, password);

        req.logIn(newUser, function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome');
            return res.redirect('/products');
        });
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/register');
    }
})

router.get('/login',(req,res)=>{
    try{
    res.render('auth/login');
    }catch(e){
        res.status(500).render('error',{err:e.message})
    }
})


router.post('/login', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            req.flash('error', 'You are not registered, please register first.');
            return res.redirect('/register');
        }

        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true // 
        })(req, res, () => {
            try {
                req.flash('success', "Welcome back");
                return res.redirect('/products');
            } catch (e) {
                res.status(500).render('error', { err: e.message });
            }
        });

    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/login');
    }
});



router.get('/logout',(req,res)=>{
    ()=>{
        req.logout()
    }
    req.flash('success','successfully logout')
    res.redirect('/login')
})

module.exports=router