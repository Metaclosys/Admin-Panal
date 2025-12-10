import { NextResponse } from 'next/server';
import { getAccessToken, BACKEND_BASE_URL } from '../../../apiContent/apiContent';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const timeframe = searchParams.get('timeframe');
    const days = searchParams.get('days');
    const accessToken = getAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${BACKEND_BASE_URL}/reports/customer-retention/export?${new URLSearchParams({
        startDate,
        endDate,
        timeframe,
        days
      }).toString()}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const blob = await response.blob();

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to export customer retention report' },
        { status: response.status }
      );
    }

    const headers = new Headers(response.headers);
    headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    headers.set('Content-Disposition', `attachment; filename=customer_retention_${startDate}_${endDate}.xlsx`);

    return new NextResponse(blob, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Customer retention report export error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 