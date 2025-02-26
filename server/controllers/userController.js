const { request } = require('express');
const User = require('../models/User');

exports.getAllUsers = async(req , res )=>{
    try{
        const users = await User.find({role:{$ne:"admin"}}).select("-password");
        console.log(users);

        // fetch all the standard users that are nonadmin (exclude the password feild)


        res.status(200).json({success:true,message:'User get successfully',users});

    }catch(error){
        res.status(500).json({success:false,message:"error while fetching all Users"})
    }
}