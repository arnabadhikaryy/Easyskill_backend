import mongoose from "mongoose";

const db_connect =async ()=>{try {
  
  await mongoose.connect(process.env.mongo_db_url)
  .then(() => console.log('Database Connected!'));
} catch (error) {
  console.log(error);
} 
}

    export default db_connect; 