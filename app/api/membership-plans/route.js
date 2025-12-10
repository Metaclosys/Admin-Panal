import { NextResponse } from "next/server";
import {
  BACKEND_BASE_URL,
  apiCall,
  API_ENDPOINTS,
} from "../apiContent/apiContent";
import { getAccessTokenFromRequest } from '../utils/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const locationId = searchParams.get("locationId");
    const active = searchParams.get("active");

    const accessToken = getAccessTokenFromRequest(request);

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const queryParams = new URLSearchParams({
      page,
      limit,
    });
    if (locationId) queryParams.append("locationId", locationId);
    if (active !== null) queryParams.append("active", active);

    const endpoint = `${
      API_ENDPOINTS.MEMBERSHIP_PLANS.BASE
    }?${queryParams.toString()}`;

    const data = await apiCall(endpoint, {
      method: "GET",
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Membership plans fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const accessToken = getAccessTokenFromRequest(request);

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("API Route received body:", body);

    const data = await apiCall(API_ENDPOINTS.MEMBERSHIP_PLANS.BASE, {
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log("Backend response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Membership plan creation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
