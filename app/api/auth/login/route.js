import { NextResponse } from "next/server";
import { apiCall, API_ENDPOINTS } from "../../apiContent/apiContent";

export async function POST(request) {
  try {
    const body = await request.json();

    // Make API call using apiCall helper
    const data = await apiCall(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify(body),
    });

  // Set the JWT token in cookies (support multiple backend token key names)
  const responseWithCookie = NextResponse.json(data);
  const token = data?.access_token || data?.token || data?.accessToken;
  if (token) {
    responseWithCookie.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }

  return responseWithCookie;
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: error.status || 500 }
    );
  }
}
