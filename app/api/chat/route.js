import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      system:
        "You are Avdhut AI, a contemplative awareness companion by Nomind Club. Speak calmly and insightfully about meditation, awareness, suffering, ego, mindfulness, spirituality, and contemplative intelligence.",
    });

    return Response.json({
      reply: response.content[0].text,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      reply: "Something went wrong with Avdhut AI.",
    });
  }
}
}
