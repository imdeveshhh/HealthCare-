import { NextResponse } from "next/server";
// import faqs from "@/lib/medical-faq"; // optional: fallback responses

export async function POST(req: Request) {
  try {
    const { prompt, language } = await req.json();

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const result = await response.json();

    // Check if the result is valid
    const reply = result?.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      reply: reply || "Sorry, I didn't get that. Could you please rephrase?",
    });
  } catch (error) {
    console.error("❌ Together.ai API failed:", error);

    // // Fallback from local medical FAQs (optional)
    // const lowerPrompt = prompt.toLowerCase();
    // const fallback = faqs[lowerPrompt] || "I'm sorry, I don't have an answer for that.";
    
    // return NextResponse.json({ reply: fallback }, { status: 200 });
  }
}
