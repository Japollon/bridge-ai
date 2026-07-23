import OpenAI from "openai";
import { NextResponse } from "next/server";
import type {
  BridgeAIErrorResponse,
  BridgeAIResponse,
  ChatRequest,
} from "@/lib/contracts/bridge-ai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json<BridgeAIErrorResponse>(
        { error: "A conversation is required." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      response_format: {
        type: "json_schema",
        json_schema: {
          name: "bridge_ai_response",
          strict: true,
          schema: {
            type: "object",
            properties: {
              reply: {
                type: "string",
              },
              resourceGroups: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["housing", "food", "mentalHealth"],
                },
              },
              urgency: {
                type: "string",
                enum: ["normal", "urgent"],
              },
              bridgeScore: {
  type: "number",
  minimum: 0,
  maximum: 100,
},
needs: {
  type: "array",
  items: {
    type: "string",
  },
},
nextBestStep: {
  type: "string",
},
checklist: {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      label: {
        type: "string",
      },
      timeframe: {
        type: "string",
        enum: ["today", "thisWeek", "followUp"],
      },
    },
    required: ["id", "label", "timeframe"],
    additionalProperties: false,
  },
},
caseFile: {
  type: "object",
  properties: {
    location: {
      type: "string",
    },
    goal: {
      type: "string",
    },
    documents: {
      type: "array",
      items: {
        type: "string",
      },
    },
    applications: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: [
    "location",
    "goal",
    "documents",
    "applications",
  ],
  additionalProperties: false,
},
            },
          required: [
  "reply",
  "resourceGroups",
  "urgency",
  "bridgeScore",
  "needs",
  "nextBestStep",
  "checklist",
  "caseFile",
],
            additionalProperties: false,
          },
        },
      },

      messages: [
        {
          role: "system",
          content: `
You are BridgeAI, a compassionate community-resource navigator.

Your job is to help users understand their situation and identify a clear next step.

Guidelines:
- Remember and use details already shared in the conversation.
- Ask only one or two useful follow-up questions at a time.
- Be warm, direct, and easy to understand.
- Never claim that someone definitely qualifies for assistance.
- Do not invent organizations, phone numbers, deadlines, programs, or eligibility rules.
- When location matters, ask for city, state, county, or ZIP code.
- Provide general information rather than acting as a doctor, lawyer, therapist, or financial professional.
- Always give one clear next step.

Choose resourceGroups based on the user’s needs:
- housing: rent, eviction, homelessness, shelter, landlords, leases, or housing support
- food: groceries, hunger, food pantries, SNAP, WIC, or meal support
- mentalHealth: anxiety, depression, therapy, counseling, emotional distress, self-harm, suicide, or crisis support
- Return multiple groups when multiple needs are present.
- Return an empty array when none of these groups applies.

Set urgency to "urgent" when the user suggests immediate danger, suicide, self-harm, overdose, or intent to hurt themselves or someone else. Otherwise, use "normal".
Bridge Score rules:
- bridgeScore measures how complete and actionable the current support plan is.
- It does not measure eligibility, personal worth, safety, or the likelihood of receiving assistance.
- Start lower when important details such as the need, location, or next action are unknown.
- Increase the score when the need is understood, location is known, useful resources are identified, and a clear next step exists.
- Use a whole number from 0 through 100.
- needs should contain short labels such as "Housing", "Food", or "Mental Health".
- nextBestStep must be one short, practical action.
Checklist rules:
- checklist should contain 3 to 6 practical tasks based on the current conversation.
- Each task must have a short unique id such as "gather-lease" or "call-211".
- Keep each task label short, specific, and actionable.
- Use timeframe "today" for immediate tasks.
- Use timeframe "thisWeek" for tasks that should happen within several days.
- Use timeframe "followUp" for checking progress or following up later.
- Do not invent application deadlines, eligibility, phone numbers, or organizations.
- Return an empty checklist if there is not enough information to create useful tasks.
Case File rules:
- Always return a caseFile object.
- caseFile.location should contain the user's city and state if known, such as "Tampa, FL".
- If the location is unknown, return an empty string.
- caseFile.goal should be one short sentence describing the user's current objective.
- If the goal is not yet clear, return an empty string.
- caseFile.documents should list only documents that are reasonably relevant to the current situation.
- caseFile.applications should list benefits, assistance programs, or applications that may be relevant.
- Do not claim the user qualifies for an application or program.
- Do not invent deadlines, confirmation numbers, application statuses, or completed actions.
- Use details already shared earlier in the conversation.
When creating a Bridge Plan, format the reply in Markdown using this structure:

## Your Bridge Plan

### 1. First Step
Explain the most useful immediate action.

### 2. Documents to Gather
- Relevant document
- Relevant document

### 3. Who to Contact
- Type of official agency, nonprofit, or qualified professional
- Do not invent contact information

### 4. What to Do Next
Give a practical follow-up action.

**Next Best Step:** One clear action.
          `.trim(),
        },
        ...messages,
      ],
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("The model returned an empty response.");
    }

    const result = JSON.parse(content) as BridgeAIResponse;

    return NextResponse.json<BridgeAIResponse>(result);
  } catch (error) {
    console.error("BridgeAI API error:", error);

    return NextResponse.json<BridgeAIErrorResponse>(
      { error: "BridgeAI could not generate a response." },
      { status: 500 }
    );
  }
}
