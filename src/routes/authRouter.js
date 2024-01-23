import { Router } from 'express';
import {signup,login} from '../controllers/authControllers.js';
import { verifyjwt } from '../middlewares/auth.middlewares.js';
import { adminwork } from '../controllers/getPages.js';
import { restrict } from '../controllers/authControllers.js';
import { addUser, verifyuser } from '../controllers/adminwork.js';
import { getuser } from '../controllers/getPages.js';
import { allusers } from '../controllers/getPages.js';
import { deleteuser } from '../controllers/adminwork.js';
import { userDashboard } from '../controllers/getPages.js';
import { uploadimage } from '../controllers/userWork.js';
import { upload } from '../middlewares/multer.middleware.js';
// import { getlogin } from '../controllers/adminwork.js';
const router = Router()

const getSignup = async(req,res) =>{
    try{
        res.render('signup')
    }
    catch(error){
         console.log(" no login page ")
    }
}
const getlogin = async(req,res) =>{
    try{
        res.render('login')
    }
    catch(error){
         console.log(" no login page ")
    }
}

router.get('/signup',getSignup)
router.route('/signup').post(signup);
router.route('/login').get(getlogin)
router.route('/login').post(login);

// router.route('/tables').get(verifyjwt,tables)


// SECURED ROUTES
router.route('/admin').get(verifyjwt,adminwork);
router.route('/admin/newuser').post(addUser)
router.route('/admin/newuser').get(verifyjwt,adminwork)
router.route('/admin/getuser').get(verifyjwt,getuser)
router.route('/admin/allusers').get(verifyjwt,allusers)
router.route('/admin/allusers/delete').get(verifyjwt,deleteuser)
router.route('/admin/allusers/verify').get(verifyjwt,verifyuser)
router.route('/user').get(verifyjwt,userDashboard)
router.route('/user').post((upload.fields(
    [
        {
            name:"image",
            maxCount:1
        }
    ]
)),verifyjwt,uploadimage)


export default router;