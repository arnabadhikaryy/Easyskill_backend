import mongoose from "mongoose";

const db_connect =async ()=>{try {
  
  await mongoose.connect('mongodb+srv://adhikaryarnab977:S73YUVGdyFPsej@arnabadhikary.7edj6ma.mongodb.net/EasySkill')
  .then(() => console.log('Database Connected!'));
} catch (error) {
  console.log(error);
} 
}

    export default db_connect; 
