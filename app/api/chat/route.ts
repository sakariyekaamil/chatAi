import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body  = await  req.json();
    const prompt = body.prompt ?? ""

    if (!prompt) {
      return NextResponse.json({ message: "prompt is empty" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY

    const ai = new GoogleGenAI({apiKey});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:prompt,
    });

    const text = response?.candidates?.[0]?.content?.parts?.[0].text

  return  NextResponse.json({ text });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "model error" }, { status: 502 });
  }
}
