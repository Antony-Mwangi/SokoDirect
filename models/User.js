import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true, 
    },

    shopName: {
        type: String,
    },

    location:{
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);