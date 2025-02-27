const User = require('../models/User');

const Team = require('../models/Team');

exports.createTeam =async(req , res)=>{
    try{
        const {name,memberEmails}=req.body;

        if(!name || !Array.isArray(memberEmails)|| memberEmails.length ===0){
            return res.status(400).json({success:false,message:"No users are selected for team formation"});
        }

        // find non-admin users

        const users = await User.find({email:{ $in: memberEmails},role:{$ne : "admin"}});



 // both length must be same DB find and memberSend
        if(users.length !== memberEmails.length){
            return res.status(400).json({success:false,message:"Invalid user for team creation"})
        }
        //find memberIDs
        const memberIds = users.map(user => user._id);

        //create the team

        const newTeam = new Team({
            name,
            members:memberIds,
            createdBy:req.user.userId  //admin name
        })


        await newTeam.save();
        await User.updateMany(
            { _id: { $in: memberIds } },
            { $push: { teams: newTeam._id } }
        );


        res.status(200).json({success:true,message:"Team Successfully Created",team:newTeam});



    }catch(error){
res.status(500).json({success:false,message:"Error in Team Creation by server", error: error.message})
    }
}


exports.getAllTeams = async(req,res)=>{
    try{
        const adminId = req.user.userId;
        const teams = await Team.find({createdBy:adminId}).populate("members","name email")

        res.status(200).json({success:true, message:"Team fetched Successfully", teams})
    }

    catch(error){
        res.status(500).json({success:false,message:"error in fetching teams" , error:error.message

        })
    }
}


exports.deleteTeam = async(req , res)=>{
    try{
        const {teamId} = req.params;
        if(!teamId) {
            return res.status(400).json({success:false,message:"Team Id missing"})
        }

        const team = await Team.findById(teamId);
        if(!team){
            return res.status(404).json({ success: false, message: "Team not found" });
        }

        await Team.findByIdAndDelete(teamId);

        res.status(200).json({success:true,message:"Team deleted"})

    }catch(error){
        res.status(500).json({success:false,message:"Error while deletion by server",error:error.message})

    }

}