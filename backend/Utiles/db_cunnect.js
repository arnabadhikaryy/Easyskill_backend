import mongoose from "mongoose";

const db_connect =async ()=>{try {
  
  await mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => console.log('Database Connected!'));
} catch (error) {
  console.log(error);
} 
}

    export default db_connect; 
