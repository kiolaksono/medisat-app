
import { NextRequest, NextResponse } from "next/server";

const getMidtransClient = () => {
  // Using require for midtrans-client
  const midtransClient = require("midtrans-client");
  return new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  });
};

export async function POST(req: NextRequest) {
  try {
    // Initialize Midtrans client
    const snap = getMidtransClient();

    const patientId = req.headers.get("id");
    const { _id } = await req.json();
    // console.log(_id, "ID dari route payment api");

    if (!patientId || !_id) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    } 

    const parameter = {
      transaction_details: {
        order_id: _id,
        gross_amount: 300000,
      },
    };

    const token = await snap.createTransactionToken(parameter);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses pembayaran" },
      { status: 500 }
    );
  }
}
