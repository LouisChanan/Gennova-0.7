import { GoogleGenAI } from "@google/genai";
import { TRAITS, USER_PROFILE } from "../constants";

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    }
    return ai;
};

export const analyzeDNAWithGemini = async (userQuestion: string): Promise<string> => {
    try {
        const client = getAIClient();
        if (!process.env.API_KEY) {
            return "Please configure your API_KEY to use the AI assistant.";
        }

        const context = `
            You are Gennova AI, a genetic assistant.
            User: ${USER_PROFILE.name}
            Traits Data: ${JSON.stringify(TRAITS)}
            
            Answer the user's question about their DNA results based on the data above.
            Keep it encouraging, scientific but accessible, and brief (under 100 words).
            If they ask about a trait not in the list, explain that it wasn't part of this specific panel.
        `;

        const response = await client.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                { role: "user", parts: [{ text: context }] },
                { role: "user", parts: [{ text: userQuestion }] }
            ]
        });

        return response.text || "I couldn't generate an analysis at this moment.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm having trouble connecting to the genetics database right now. Please try again later.";
    }
};