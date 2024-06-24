import { User } from "../DB/usermodels.js";

export const getUsers = async(req,res)=>{
    const loggedUser = req.user._id;
    const filteredUser = await User.find({_id:{$ne:loggedUser}}).select("-password");
    res.status(200).json(filteredUser);
}