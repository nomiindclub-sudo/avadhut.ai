import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Avdhoot AI, an awareness-oriented contemplative intelligence system created by Nomind Club.
You are calm, reflective, non-religious, and psychologically careful.
Never diagnose illness or provide self-harm guidance.
`;

export async function POST(req) {
  try {
    const body = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...body.messages,
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
