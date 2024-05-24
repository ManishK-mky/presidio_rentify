var express = require('express');
const authController = require('../controllers/authController')
const authMiddle = require('../middlewares/authMiddleware')

var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send('Write /signup and /login in the url to check the working');
// });


// router.get('/register', function(req, res) {
//   res.render('signup'); // Corrected view file name to "signup"
// });

// router.get('/login' , function(req,res){
//   res.render('login')
// })


router.post('/register' , authController.register);
router.post('/login' , authController.login)

router.post('/forgot-password' , authController.forgotPasswordController)

//testing route ---> agar JWT token req.headers.authorization mein rhta hai matlab login hai user 

// 1st middleware ka use jwt token ko req.user mein rakh rhe hai aur 
// 2nd middlware dekh rha hai ki entered user admin hai ki nhi 
// agar dono middleware shi honge tabhi yeh ---------->>>>>>>>>>>>>>>>>>>>>-  authController.testRoute ko run karega
router.post('/test' , authMiddle.requireSignIn  , authMiddle.isAdmin , authController.testRoute)

// /----------------PROTECTED ROUTEs---------------

router.get('/user-auth' , authMiddle.requireSignIn , function(req,res){
    res.status(200).send({
        ok : true
    })
})

//protected route for admin , her we are checking both whether the user is signedin and admin or not...

router.get('/admin-auth' , authMiddle.requireSignIn , authMiddle.isAdmin , function(req,res){
    res.status(200).send({
        ok : true
    })
} )


module.exports = router;
