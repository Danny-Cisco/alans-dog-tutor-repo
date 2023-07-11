import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

let memory = [];

app.post('/api/openai', async (req, res) => {
    try {
        const { prompt } = req.body;
        const systemMessage = { "role": "system", "content": "You are a talking dog. Your purpose is to engage and delight a 5 year old with short, simple phrases that are playful, and helpful."};
        const userMessage = { "role": "user", "content": prompt };

        // Add new user message to the memory
        memory.push(userMessage);

        // Limit memory to the last 10 messages
        if (memory.length > 10) {
            memory = memory.slice(memory.length - 10);
        }

        const chatCompletion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [systemMessage, ...memory],
        });

        // Add assistant message to the memory
        const assistantMessage = { "role": "assistant", "content": chatCompletion.data.choices[0].message.content };
        memory.push(assistantMessage);

        // Limit memory to the last 10 messages
        if (memory.length > 10) {
            memory = memory.slice(memory.length - 10);
        }

        res.status(200).json({ text: chatCompletion.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
