import User from '../models/usermodel.js'
import Listing from '../models/trekhiveschema.js'

export const renderRegisterForm= (req,res)=>{
    res.render('auth/register')
}

export const createNewUser= async(req,res,next)=>{
    // res.send(req.body)
    try{
         const {username,password,email}= req.body
         const user=new User({email,username})
         const registeredUser= await User.register(user,password)
         // console.log(registeredUser)
         req.login(registeredUser,err=>{
            if(err){
                return next(err)
            }else{
                req.flash('success','Account created successfully.')
                res.redirect('/listing')
            }
         })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
   
}

export const renderLogin= (req,res)=>{
    if (req.query.returnTo) {          //If the user clicked "Log in to Review" from a show page, save that exact URL to the session,otherwise storeReturnTo works in post route
        req.session.returnTo = req.query.returnTo; 
    }
    res.render('auth/login')
}

export const login= (req,res)=>{
    req.flash('success','Signed in successfully.')
    const redirectUrl= res.locals.returnTo || '/listing'
    res.redirect(redirectUrl)
}

export const logout= (req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
         req.flash('success',"Signed out securely.")
         const redirectUrl = req.get('Referer') || '/home';
         res.redirect(redirectUrl)
    });
}


export const renderUserProfile = async (req, res) => {
    try {
        // 1. URL se username nikalein
        const { username } = req.params;

        // 2. Username se database me user ko dhoondhein
        const profileUser = await User.findOne({ username: username });

        if (!profileUser) {
            req.flash('error', 'User not found.');
            return res.redirect('/listing');
        }

        // 3. Is user ki ID (_id) ka use karke uske saare uploaded treks fetch karein
        const userTreks = await Listing.find({ author: profileUser._id });

        // 4. EJS page par data bhejein
        res.render('places/userTreks', { profileUser, userTreks });

    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong while fetching the profile.');
        res.redirect('/listing');
    }
}