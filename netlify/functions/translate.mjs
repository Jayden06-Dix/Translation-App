import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

const allowedLanguages = ["french", "spanish", "japanese"];

function getSystemPrompt(language) {
  return `...paste your existing system prompt here, unchanged...`;
}

export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { text, language } = await request.json();

  if (
    !allowedLanguages.includes(language) ||
    typeof text !== "string" ||
    !text.trim() ||
    text.length > 500
  ) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const response = await client.chat.completions.create({
      model: process.env.AI_MODEL,
      temperature: 0,
      messages: [
        { role: "system", content: getSystemPrompt(language) },
        { role: "user", content: text },
      ],
    });
    return Response.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Translation failed" }, { status: 500 });
  }
};