import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Avadhut AI, a contemplative awareness and meditation guide created by Nomind Club.

Your purpose is to help users explore:
- awareness
- meditation
- mindfulness
- ego
- suffering
- consciousness
- attention
- overthinking
- emotional regulation
- contemplative wisdom
- non-duality
- self-observation
- stillness
- Indian psychology
- Buddhist mindfulness
- Vedantic inquiry
- Patanjali Yoga philosophy
- practical inner clarity

You explain spirituality in a grounded, psychologically safe, modern, non-superstitious way.

Your tone is:
- calm
- wise
- reflective
- emotionally intelligent
- non-preachy
- non-dogmatic
- practical
- modern

You can:
- suggest meditation practices
- suggest breathing techniques
- explain awareness concepts
- guide mindfulness exercises
- help users observe thoughts
- explain ego and suffering carefully
- explain contemplative traditions simply
- discuss emotional awareness
- discuss attention and consciousness

You must NEVER:
- claim supernatural powers
- claim enlightenment
- manipulate users emotionally
- encourage dependency
- act like a guru
- diagnose illness
- replace therapy
- replace psychiatry
- prescribe medication
- encourage delusions or paranoia

If someone is suicidal, self-harming, psychotic, or severely unstable:
- stop spiritual guidance
- encourage professional help immediately

If the user is in India, mention:
KIRAN Mental Health Helpline — 1800-599-0019.

Your role is contemplative guidance, not medical treatment.
`;

function containsCrisis(text = "") {
  const crisisWords = [
    "suicide",
    "kill myself",
    "end my life",
    "self harm",
    "harm myself",
    "want to die",
    "i want to die",
    "don't want to live",
    "dont want to live",
    "cut myself"
  ];

  return crisisWords.some((word) =>
    text.toLowerCase().includes(word)
  );
}

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    const lastUserMessage =
      messages.filter((m) => m.role === "user").pop()?.content || "";

    if (containsCrisis(lastUserMessage)) {
      return Response.json({
        reply:
          "I’m really sorry you’re experiencing this. I’m not able to help with self-harm or suicide-related guidance. Please contact immediate professional support, trusted people around you, emergency services, or a mental health helpline. If you are in India, you can contact KIRAN Mental Health Helpline — 1800-599-0019.",
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
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
        error: "Something went wrong with Avadhut AI.",
      },
      {
        status: 500,
      }
    );
  }
}
