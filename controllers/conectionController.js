// const Conection = require('../models/conection');

const Conection = require('../models/conection')

//Follow---
module.exports.Follow = async(req, res)=> {
    try {
      const { userID, followersID,status} = req.body;
      let  conection = await Conection.create({userID, followersID,status});
      res.status(200).json({message:"Follow request sent",conection});
    } catch (e) {
        res.status(400).json(e.message)
    }
}
  
//getAllActiveFollowing--
  module.exports.GetAllActiveFollowing = async(req, res)=> {
    try {
      const userID = req.params.id;
      let  conection = await  Conection.find({userID}).where('status').equals("active") ;
      res.status(200).json({message:"Active Following",conection});
    } catch (e) {
        res.status(400).json(e.message)
    }
}

//GetallPendingFollowing
  module.exports.GetAllPendingFollowing = async(req, res)=> {
    try {
      const userID = req.params.id;
      let  conection = await  Conection.find({userID}).where('status').equals("pending") ;
      res.status(200).json({message:"Pending Following",conection});
    } catch (e) {
        res.status(400).json(e.message)
    }
}
  
//GetAllActiveFollow

  module.exports.GetAllActiveFollow =async(req, res)=> {
    try {
      const followersID = req.params.id;
      let  conection = await  Conection.find({followersID}).where('status').equals("active") ;
      res.status(200).json({message:"Active Fellow Views",
      data:conection,
      Status:true,
}) 

    } catch (e) {
        res.status(400).json(e.message)
    }
}
  
//GetallPendingFollow--
  module.exports.GetAllPendingFollow =async(req, res)=> {
    try {
      const followersID = req.params.id;
      let  conection = await  Conection.find({followersID}).where('status').equals("pending") ;
      res.status(200).json({message:'All Pending Fellow',
                        conection: conection,
status:true      })        
    } catch (e) {
        res.status(400).json(e.message)
    }
  }
//Unfollow--
  module.exports.Unfollow = async(req, res)=> {
    try {
      const id = req.params.id;
      let  conection = await Conection.deleteOne({_id:id}) ;
      res.status(200).json(conection);
    } catch (e) {
        res.status(400).json(e.message)
    }
}
  
//AcceptFollowingRequest---
  module.exports.AcceptFollowingRequest = async(req, res)=> {
    try {
      const id = req.params.id;
      let  conection = await  Conection.findOneAndUpdate({_id:id},{status:"active"}) ;
      
      res.status(200).json(conection);
    } catch (e) {
        res.status(400).json(e.message)
    }
}

