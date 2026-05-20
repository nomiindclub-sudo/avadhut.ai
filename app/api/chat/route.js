export async function POST(req) {
  try {
    const body = await req.json();

    const userMessage =
      body.messages?.[body.messages.length - 1]?.content ||
      body.message ||
      "";

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
                "You are Avdhut AI, a contemplative awareness companion by Nomind Club. Help users with meditation, spirituality, journaling, awareness, mindfulness, emotional clarity, contemplative practices, and inner growth. Speak calmly, deeply, and practically.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    return Response.json({
      reply:
        data?.choices?.[0]?.message?.content ||
        "Avdhut AI could not generate a response.",
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      reply: "Something went wrong with Avdhut AI.",
    });
  }
}
