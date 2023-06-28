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

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 7,
        temperature: 0,
      });
  
      res.status(200).json({ text: response.choices[0].text });
    } catch (error) {
      console.error('Error:', error);  // Log the error
      res.status(500).json({ error: error.toString() });
    }
};

