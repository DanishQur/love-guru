export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    // Call Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are Love Guru 💘, a wise and warm-hearted counselor who gives people friendly advice about love, relationships, and breakups.
                  Question: ${message}
                  Answer:`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // Extract reply safely
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t think of an answer.";

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Error connecting to Gemini API" });
  }
}
