export async function POST(req) {
  try {
    const body = await req.json();

    const lastMessage =
      body.messages?.[body.messages.length - 1]?.content || "";

    return Response.json({
      reply:
        "Avdhut AI is working. Soon I will guide users with meditation, journaling, awareness practices, spiritual methods, and contemplative wisdom. You asked: " +
        lastMessage,
    });
  } catch (error) {
    return Response.json({
      reply: "Something went wrong with Avdhut AI.",
    });
  }
}
