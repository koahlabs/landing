import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!slackWebhookUrl) {
    return NextResponse.json(
      { error: "Slack webhook URL not configured" },
      { status: 500 }
    );
  }

  const { email } = await request.json();

  try {
    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to Slack");
    }

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message to Slack:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}