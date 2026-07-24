import type {
  BridgeAIResponse,
  ChatMessage,
  ChatRequest,
} from "@/lib/contracts/bridge-ai";
import { isBridgeAIResponse } from "@/lib/validation/bridge-ai";

const BRIDGE_CHAT_ENDPOINT = "/api/chat";
const REQUEST_FAILED_MESSAGE = "The request failed.";

export async function sendBridgeChatRequest(
  messages: ChatMessage[]
): Promise<BridgeAIResponse> {
  const request: ChatRequest = { messages };

  try {
    const response = await fetch(BRIDGE_CHAT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(REQUEST_FAILED_MESSAGE);
    }

    const data: unknown = await response.json();

    if (!isBridgeAIResponse(data)) {
      throw new Error(REQUEST_FAILED_MESSAGE);
    }

    return data;
  } catch {
    throw new Error(REQUEST_FAILED_MESSAGE);
  }
}
