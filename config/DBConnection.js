import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = "mongodb+srv://zeddinimohameddhia:9sbrv64mLWRgYcAW@cluster0.v13gdmm.mongodb.net/";
const connection =mongoose.connect(MONGO_URL).then(()=>{
    console.log("data base ok atlas")
})
.catch(err =>{
    console.log(err)

})

export default connection;
