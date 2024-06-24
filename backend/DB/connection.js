import mongoose from "mongoose";

export const connection = async(url)=>{
    try{
        const connect = await mongoose.connect(url);
        if(connect){
            console.log("database connected");
        }
        else{
            console.log("connection failed");
        }
    }
    catch(error){
        console.log(error);
    }
}