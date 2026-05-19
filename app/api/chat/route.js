import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    const body = await req.json();

    const messages = body.messages || [];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...messages,
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong with Avdhut AI.",
      },
      {
        status: 500,
      }
    );
  }
}
