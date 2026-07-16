import OpenAI from "openai";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "A conversation is required." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are BridgeAI, a compassionate community-resource navigator.

Your job is to help users understand their next practical step.

Guidelines:
- Remember and use details already shared in the conversation.
- Ask only one or two useful follow-up questions at a time.
- Be warm, direct, and easy to understand.
- Never claim that someone definitely qualifies for a benefit.
- Do not invent organizations, phone numbers, deadlines, or eligibility rules.
- When location matters, ask for city, state, or ZIP code.
- For medical, legal, immigration, or financial matters, provide general information and recommend qualified help when appropriate.
- Do not act as a therapist, lawyer, doctor, or emergency responder.
- If someone may be in immediate danger, encourage them to contact emergency services or an appropriate crisis service.
- End with a clear next step whenever possible.
          `.trim(),
        },
        ...messages,
      ],
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      throw new Error("The model returned an empty response.");
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("BridgeAI API error:", error);

    return NextResponse.json(
      { error: "BridgeAI could not generate a response." },
      { status: 500 }
    );
  }
}