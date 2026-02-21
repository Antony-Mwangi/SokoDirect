import { NextResponse } from "next/server";
import {connectDB} from "@/lib/connectDB";
import Sale from "@/models/Sale";

export async function GET() {
  await connectDB();
  const sales = await Sale.find();
  return NextResponse.json(sales);
}

export async function POST(req) {
  await connectDB();
  const { amount } = await req.json();
  const sale = await Sale.create({ amount });
  return NextResponse.json(sale);
}