import mongoose, { Schema } from "mongoose";

const chat_schema = new Schema({
    messeges:[ 
        {
            enrolmrnt_no:Number,
            name:String,
            sms:String
        }
    ]
})

let chat_model = mongoose.model('easyskill_chat',chat_schema);

export default chat_model;