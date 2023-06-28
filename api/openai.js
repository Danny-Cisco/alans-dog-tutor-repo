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
        console.log('Request body:', req.body);
        const { prompt } = req.body;
        console.log('Prompt:', prompt);

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 7,
            temperature: 0,
        });

        console.log('Response:', response);
        console.log('Choices:', response.choices);

        if (response.choices && response.choices.length > 0) {
            console.log('Text:', response.choices[0].text);
            res.status(200).json({ text: response.choices[0].text });
        } else {
            console.error('No choices found in the response.');
            res.status(500).json({ error: 'No choices found in the response.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
