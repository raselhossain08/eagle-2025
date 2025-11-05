import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/config/auth.config';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    const { functionName, params } = body;

    // Get the token from request cookies (try AdminToken first, then token for backward compatibility)
    const token = request.cookies.get('AdminToken')?.value || request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 });
    }

    // Verify the token
    try {
      const decodedToken = await verifyToken(token);
      if (!decodedToken) {
        return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
      }

      // Forward the request to the backend
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${backendUrl}/functions/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ functionName, params }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return NextResponse.json({ error: data.error || 'Failed to execute function' }, { status: response.status });
      }

      return NextResponse.json({ result: data.result });
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Function execution error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the token from request cookies (try AdminToken first, then token for backward compatibility)
    const token = request.cookies.get('AdminToken')?.value || request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 });
    }

    // Verify the token
    try {
      const decodedToken = await verifyToken(token);
      if (!decodedToken) {
        return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
      }

      // Forward the request to the backend
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${backendUrl}/functions/list`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        return NextResponse.json({ error: data.error || 'Failed to get available functions' }, { status: response.status });
      }

      return NextResponse.json({ functions: data.functions });
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Function list error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
