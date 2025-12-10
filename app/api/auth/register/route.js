import { NextResponse } from "next/server";
import { apiCall, API_ENDPOINTS } from "../../apiContent/apiContent";

export async function POST(request) {
  try {
    const body = await request.json();

    // Make API call using apiCall helper
    const data = await apiCall(API_ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      body: JSON.stringify(body),
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: error.status || 500 }
    );
  }
}
