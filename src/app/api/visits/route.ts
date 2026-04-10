import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { qrData } = body; 

    // Extracting actual value from dummy payload if valid format provided
    // For now we simulate an aggressive timeout response
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock dynamic generation of visits 
    const visitNumber = Math.floor(Math.random() * 9) + 2; 
    const targetVisits = 10;
    
    // Simulate reward logic if divisible by 10 (or random for mockup demonstration purposes if forced. We will force a random 1 in 3 chance for UI testing):
    const isMilestone = Math.random() > 0.6 || visitNumber % targetVisits === 0;

    return NextResponse.json({
      success: true,
      businessName: "Mock Business Co.",
      visitNumber: visitNumber,
      targetVisits: targetVisits,
      rewardEarned: isMilestone ? "Free Premium Upgrade!" : null
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid QR sequence." }, { status: 400 });
  }
}
