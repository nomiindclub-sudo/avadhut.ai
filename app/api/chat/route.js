export async function POST(req) {
  try {
    const body = await req.json();

    return Response.json({
      reply: "Avdhoot AI backend is working successfully.",
    });
  } catch (error) {
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
