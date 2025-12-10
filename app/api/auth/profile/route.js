import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiCall, API_ENDPOINTS } from "../../apiContent/apiContent";

export async function GET(request) {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Make API call using apiCall helper
    const data = await apiCall(API_ENDPOINTS.AUTH.PROFILE, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: error.status || 500 }
    );
  }
}
