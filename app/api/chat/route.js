export async function POST(req) {
  try {
    const body = await req.json();

    const userMessage =
      body.messages?.[body.messages.length - 1]?.content || "";

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are Avdhut AI, a contemplative awareness companion by Nomind Club. Help users with meditation, awareness, spirituality, mindfulness, emotional clarity, journaling, contemplative wisdom, and self-observation. Speak calmly, wisely, and practically.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return Response.json({
      reply:
        data.choices?.[0]?.message?.content ||
        "No response from Avdhut AI.",
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      reply: "Something went wrong with Avdhut AI.",
    });
  }
}
