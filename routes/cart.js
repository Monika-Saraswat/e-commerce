const express=require('express')
const User = require('../models/User')
const Product = require('../models/Product')
const { isLoggedIn } = require('../middleware')
const router=express.Router()


router.get('/user/cart', isLoggedIn, async (req, res) => {
    try {
        let user = await User.findById(req.user._id).populate('cart');
        res.render('cart/cart', { user });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/products');
    }
});


router.post('/user/:productId/add', isLoggedIn, async (req, res) => {
    try {
        let { productId } = req.params;
        let userId = req.user._id;

        // Find the product and the user
        let product = await Product.findById(productId);
        let user = await User.findById(userId);

        // Add product to user's cart
        user.cart.push(product);
        await user.save();

        // Redirect to cart page
        res.redirect('/user/cart');
    } catch (e) {
        // Handle error if any
        req.flash('error', e.message);
        res.redirect('/products');
    }
});

router.delete('/user/:userid', async (req, res) => {
    try {
      const { userid } = req.params;
      const { cartid } = req.query;
  
      // Find the user by ID
      let user = await User.findById(userid);
  
      // Check if the user and cart exist
      if (!user) {
        req.flash('error', 'User not found');
        return res.redirect('/user/cart');
      }
  
      // Use MongoDB's $pull operator to remove the product from the cart
      await User.findByIdAndUpdate(userid, {
        $pull: { cart: cartid }  // Removes the product with id equal to cartid from the cart array
      });
  
      req.flash('success', 'Product deleted successfully!');
      res.redirect('/user/cart');
    } catch (e) {
      res.status(500).render('error', { err: e.message });
    }
  });
  


module.exports=router