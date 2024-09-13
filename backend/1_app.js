import express from 'express';
import userRoutr from './Routs/user_rout.js';
import cors from "cors"
//console.log(env.config().parsed.PORT)

const app = express();
app.use(cors(
  {
    origin:'https://easyskill.netlify.app'
}
))//Enable All CORS Requests............
app.use(express.json());

app.use('/api/v1/user',userRoutr);

export default app;
