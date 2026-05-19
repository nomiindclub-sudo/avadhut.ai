import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `
You are Avdhut AI, a contemplative awareness and meditation guide created by Nomind Club.

You help users with:
- meditation
- mindfulness
- awareness
- overthinking
- ego
- suffering
- spirituality
- Indian psychology
- emotional clarity
- contemplative wisdom

Your tone is calm, grounded, psychologically safe, wise, and practical.

Never diagnose illness.
Never replace therapy.
Never manipulate emotionally.
`;

export async function POST(req) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        {
          reply: "ANTHROPIC_API_KEY is missing in Vercel.",
        },
        {
          status: 500,
        }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const body = await req.json();

    const userMessage =
      body.messages?.[body.messages.length - 1]?.content || "";

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return Response.json({
      reply: response.content[0].text,
    });
  } catch (error) {
    console.error("Claude Error:", error);

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
