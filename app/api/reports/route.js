import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Sale from "@/models/Sale";

export async function GET() {
  await connectDB();

  const now = new Date();

  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const results = await Sale.aggregate([
    {
      $facet: {
        daily: [
          { $match: { timestamp: { $gte: startOfDay } } },
          { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ],
        monthly: [
          { $match: { timestamp: { $gte: startOfMonth } } },
          { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ],
        yearly: [
          { $match: { timestamp: { $gte: startOfYear } } },
          { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ],
      },
    },
  ]);

  return NextResponse.json({
    daily: results[0].daily[0]?.total || 0,
    monthly: results[0].monthly[0]?.total || 0,
    yearly: results[0].yearly[0]?.total || 0,
  });
}