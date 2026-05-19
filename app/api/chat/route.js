import OpenAI from "openai";

const SYSTEM_PROMPT = `
You are Avdhut AI, a contemplative awareness and meditation guide created by Nomind Club.

You help users with:
- meditation
- awareness
- mindfulness
- ego
- suffering
- spirituality
- consciousness
- overthinking
- emotional clarity
- Indian psychology
- contemplative wisdom

Your tone is calm, wise, modern, practical, and psychologically safe.

Never diagnose illness.
Never replace therapy.
Never claim supernatural powers.
Never manipulate emotionally.
`;

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { reply: "OPENAI_API_KEY is missing in Vercel Environment Variables." },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...(body.messages || []),
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Avdhut error:", error);

    return Response.json(
      {
        reply: "Something went wrong with Avdhut AI.",
      },
      {
        status: 500,
      }
    );
  }
}
