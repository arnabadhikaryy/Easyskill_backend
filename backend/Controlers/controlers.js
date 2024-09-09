import user_model from "../Models/user_schema.js";
import chat_model from "../Models/chat_schema.js";
import bcrypt from "bcrypt"
async function createAccount(req,res){
 let NAMEE = req.body.NAME;
 let email = req.body.email;
 let password = req.body.password;
 let enrolment_id = req.body.enrolment_id;
 let file =undefined// req.body.files[0]
 let hasspassword;

 if(!NAMEE || ! email || !password || !enrolment_id){
  res.send({status:false,message:'fill all fild',found:`name:${NAMEE},email:${email},password:${password}`})
 }

 //hash password
 try {
  hasspassword = await bcrypt.hash(password,10);
 } catch (error) {
    res.send({status:false,message:"failed to hash password",error:error});
    return;
 }

 //upload avatar
 try {
    if(file){

    }
 } catch (error) {
    
 }


 let user_info = user_model({
  NAME: NAMEE,
  enrolment_id:enrolment_id,
  email:email,
  password:hasspassword
 })

 //try to save data
try {
  if(user_info){
    console.log(user_info)
   const result =await user_info.save();
   console.log(result);
   res.send({status:true,message:'account created succesfully',data:result})
  }
  else{
    res.send({status:false,message:'user info not found'})
    return;
  }
} catch (error) {
  res.send({status:false,message:'user info not found',error:error});
  return;
}

}

async function Login(req,res,next){
  let enrolment_id = req.body.enrolment_id;
  let password = req.body.password;

  let response = await user_model.findOne({enrolment_id:enrolment_id});
  if(!response){
    res.send({status:false,message:"user not exist"});
    return;
  }
  let hashpass=response.password;
console.log(password,hashpass,response)
  let isPasswordcurrect = await bcrypt.compare(password,hashpass);

  if(isPasswordcurrect==true){
    res.send({status:true,message:"currect password",info:response})
    console.log('correct password')
    next();
  }
  if(isPasswordcurrect==false){
    res.send({status:false,message:"wrong password"})
  }       
}

async function chagepassword(req,res) {
  let enrolment_id = req.body.enrolment_id;
  let old_pass = req.body.old_pass;
  let new_pass = req.body.new_pass;

  let response = await user_model.findOne({enrolment_id:enrolment_id});
  if(!response){
    res.send({status:false,message:"user not exist"});
    return;
  }

  let hashpass=response.password;
  console.log(old_pass,hashpass,response)
    let isPasswordcurrect = await bcrypt.compare(old_pass,hashpass);
  
    if(isPasswordcurrect==true){
      console.log('correct password')
      try {
        console.log(new_pass)
        let hasspassword = await bcrypt.hash(new_pass,10);
        console.log(hasspassword)

         
        let resp = await user_model.findByIdAndUpdate(response._id,{password:hasspassword});
        

       res.send({status:true,message:'password changed',data:resp})
       } catch (error) {
          res.send({status:false,message:"failed to hash password",error:error});
          return;
       }
    }
    if(isPasswordcurrect==false){
      res.send({status:false,message:"wrong password"}) 
    }
}

async function  store_sms(req,res) {
  let smss=req.body.mas;
  let enrol=req.body.enrol_id;
  let name=req.body.name;

  if(!smss||!enrol||!name){
    console.log('a sms not save to databas');
    return
  }
  if(smss&&enrol&&name){
    const chatId = '66dbcaee0ce0ad98c21378e6'
    
    const newMessages = [
      {
          enrolmrnt_no: enrol,
          name: name,
          sms: smss
      }
  ];


  await  chat_model.updateOne(
    { _id: chatId }, 
    { $push: { messeges: { $each: newMessages } } }
)
    .then(result => {
        console.log("Update result:", result);
        res.send({status:true,info:result})
    })
    .catch(err => {
        console.error("Error updating document:", err);
        res.send({status:false})
    });
    
  }
}

async function get_all_messages(req,res) {
  const response = await chat_model.findById('66dbcaee0ce0ad98c21378e6');
  if(response){
    res.send({status:true,info:response.messeges})
  }
  else{
    res.send({status:false,message:'messege no found in mongodb'})
  }
}
export {createAccount,Login,chagepassword,store_sms,get_all_messages} 