import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { businessId } = await request.json();

    // Mock processing delay communicating to an external database 
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      success: true,
      message: `Reward triggered securely for business mapping: ${businessId}`
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid burn payload mapped." }, { status: 400 });
  }
}
