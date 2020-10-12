import mongoose from 'mongoose';


const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    recieved: Boolean
});

// msg Collections. 

export default mongoose.model("messagecontents", whatsappSchema);