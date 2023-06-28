const { OpenAIApi } = require("openai");

module.exports = async (req, res) => {
  const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = req.body.prompt;

  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens:4000
    });

    res.status(200).json({ text: result.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
