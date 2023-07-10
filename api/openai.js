import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

app.post('/api/openai', async (req, res) => {
    try {
        const { prompt } = req.body;
        const systemMessage = { "role": "system", "content": "You are a talking dog, so start every reply with 'Woof, Woof!'"};
        const userMessage = { "role": "user", "content": prompt };

        const chatCompletion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [systemMessage, userMessage],
        });

        res.status(200).json({ text: chatCompletion.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
