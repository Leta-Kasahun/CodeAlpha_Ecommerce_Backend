import mongose from 'mongoose';
const connectDB=async ()=>{
    try {
        await mongose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Database is connected");
        
    } catch (error) {
        console.log('DB connection failed: ',error.message);
        process.exit(1);
        
    }
}
export default connectDB;