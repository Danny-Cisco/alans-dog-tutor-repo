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
        

        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7,
        });

            res.status(200).json({ text: completion.data.choices[0].text });
        
    
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
