import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Product from "@/models/Product";
import mongoose from "mongoose";

/* =========================
   GET PRODUCTS (with search + category filter)
========================= */
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category && category !== "All") {
    query.category = category;
  }

  const products = await Product.find(query).sort({ createdAt: -1 });

  return NextResponse.json(products);
}

/* =========================
   ADD PRODUCT
========================= */
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const product = await Product.create(body);
  return NextResponse.json(product);
}

/* =========================
   UPDATE PRODUCT
========================= */
export async function PUT(req) {
  await connectDB();
  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(
    body._id,
    body,
    { new: true }
  );

  return NextResponse.json(updated);
}

/* =========================
   RESTOCK PRODUCT (Atomic)
========================= */
export async function PATCH(req) {
  await connectDB();
  const { productId, quantity } = await req.json();

  const updated = await Product.findByIdAndUpdate(
    productId,
    { $inc: { stockQuantity: quantity } },
    { new: true }
  );

  return NextResponse.json(updated);
}

/* =========================
   DELETE PRODUCT
========================= */
export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}