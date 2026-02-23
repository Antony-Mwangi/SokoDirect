import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/connectDB";
import Product from "@/models/Product";
import Sale from "@/models/Sale";

export async function POST(req) {
  await connectDB();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, quantitySold } = await req.json();

    if (!productId || quantitySold <= 0) {
      throw new Error("Invalid input");
    }

    // Get product inside transaction
    const product = await Product.findById(productId).session(session);

    if (!product) throw new Error("Product not found");

    if (product.stockQuantity < quantitySold) {
      throw new Error("Insufficient stock");
    }

    const totalPrice = product.price * quantitySold;

    // Atomic stock deduction
    await Product.updateOne(
      { _id: productId },
      { $inc: { stockQuantity: -quantitySold } },
      { session }
    );

    // Create sale
    await Sale.create(
      [
        {
          productId,
          quantitySold,
          totalPrice,
          category: product.category,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ success: true });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}