/*const { OpenAIApi } = require("openai");

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
    console.error('OpenAI API call failed:', error);
    res.status(500).json({ error: error.toString() });
  }
};
*/

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion("text-davinci-003", {
prompt: "What are the colours of the rainbow?",
temperature: 0.7,
max_tokens: 256,
top_p: 1,
frequency_penalty: 0,
presence_penalty: 0,
});

console.log(response.choices[0].text);