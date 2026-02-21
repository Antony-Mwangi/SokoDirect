import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Sale || mongoose.model("Sale", SaleSchema);