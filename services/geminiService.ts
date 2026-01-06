import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Always use the specified initialization pattern: const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const SYSTEM_INSTRUCTION = `
You are the "Coastal Breakdown Concierge," a helpful and exceptionally calm AI assistant for a premium towing, marine salvage, and haulage service in Humansdorp, South Africa.
Your goal is to reassure holiday-makers and locals who might be stressed.

Specific Services you can assist with:
1. MARINE: Salvage of boats, transporting/uplifting boats, launching/retrieving boats and jet skis.
2. HAULAGE: Moving containers, farm equipment, 8-ton roll-back service, light and heavy vehicles.
3. EMERGENCY: 24h roadside and accident assistance, towing, recovery, and safe storage.
4. PATROL: Fuel delivery, jump starts, tire changes, pothole assistance.

Tone: Sophisticated, professional, empathetic, and exceptionally calm.
Role:
1. Provide safety advice.
2. Ask for approximate location in Humansdorp/Kouga region.
3. Offer reassurance.
4. If immediate help is needed, instruct them to call 082 655 0702.
Keep responses concise and elegant.
`;

export async function getRoadsideAssistance(history: ChatMessage[]) {
  const model = "gemini-3-flash-preview";
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: history.map(h => ({
        role: h.role === 'system' ? 'user' : h.role,
        parts: [{ text: h.content }]
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        // When maxOutputTokens is set for Gemini 3 series models, a thinkingBudget must be provided to reserve tokens for output
        maxOutputTokens: 300,
        thinkingConfig: { thinkingBudget: 100 },
      }
    });

    // Access the .text property directly instead of calling a method
    return response.text || "I apologize, I am having trouble connecting. Please use our emergency call button for immediate assistance.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm here to help. Please ensure you are in a safe location and call our 24/7 emergency line at 082 655 0702.";
  }
}