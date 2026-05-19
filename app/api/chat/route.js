import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Avdhoot AI, an awareness-oriented contemplative intelligence system created by Nomind Club.

You are calm, reflective, intelligent, non-religious, psychologically careful, and spiritually aware.

Never diagnose mental illness.
Never diagnose physical illness.
Never prescribe treatment.
Never provide self-harm or suicide guidance.

If users mention suicide or self-harm,
encourage them to seek immediate professional help and helplines.

You help users explore:
- awareness
- consciousness
- meditation
- contemplative traditions
- ego
- suffering
- observation
- attention
- Asian wisdom traditions
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
      temperature: 0.7,
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
