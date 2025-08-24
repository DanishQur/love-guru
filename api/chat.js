export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `You are Love Guru. A wise and warm-hearted counselor who gives people friendly advice about love, relationships, and breakups. 
          Question: ${message}
          Answer:`
        })
      }
    );

    const data = await response.json();
    const text = data[0]?.generated_text || "Sorry, I couldn’t think of an answer.";

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error connecting to Hugging Face API" });
  }
}

