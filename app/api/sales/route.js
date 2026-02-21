import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/connectDB";
import Sale from "@/models/Sale";

function getUserIdFromRequest(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
}

export async function GET(req) {
  await connectDB();

  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sales = await Sale.find({ userId }).sort({ date: -1 });
  return NextResponse.json(sales);
}

export async function POST(req) {
  await connectDB();

  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const sale = await Sale.create({
    userId,
    amount: body.amount,
    date: body.date,
    category: body.category,
    paymentMethod: body.paymentMethod,
    notes: body.notes,
  });

  return NextResponse.json(sale);
}

export async function DELETE(req) {
  await connectDB();

  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  await Sale.deleteOne({ _id: id, userId });

  return NextResponse.json({ message: "Deleted" });
}