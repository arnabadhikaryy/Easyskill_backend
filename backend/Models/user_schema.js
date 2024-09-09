import mongoose, { Schema, Types } from "mongoose";

const user_schema = new Schema({
    avatar:[
        {
            punlic_id:String,
            secured_url:String
        }
    ],
    NAME:{
        type:String,
        required:true
    },
    enrolment_id:{
        type:Number
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    inrolled_courses:[
        { 
        course_name:String, 
        completed:Number
        }
    ],
    weekly_activitt:[ 
        {
            monday:Number,
            tu:Number,
            wed:Number,
            th:Number,
            fri:Number,
            sat:Number,
            sun:Number
        }
    ]
})

let user_model = mongoose.model('easyskill_user',user_schema);

export default user_model;