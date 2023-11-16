import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URL = "mongodb+srv://zeddinimohameddhia:9sbrv64mLWRgYcAW@cluster0.v13gdmm.mongodb.net/";
const connection =mongoose.connect(MONGO_URL).then(()=>{
    console.log("data base ok atlas")
})
.catch(err =>{
    console.log(err)

})

/* mongoose.createConnection(MONGO_URL).on('open', () => {
    console.log("Mongo connected");
}).on('error', () => {
    console.log("Mongo connection error");
});*/

export default connection;