import { NextResponse } from 'next/server';
import { BACKEND_BASE_URL } from '../../../apiContent/apiContent';

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/products/categories/list`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product categories');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product categories' },
      { status: 500 }
    );
  }
} 