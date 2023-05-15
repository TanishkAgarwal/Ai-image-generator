import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  // res.json({ message: 'Hello from DALL-E!' });
  res.send('hello from delle ')
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(req.body);
    console.log(".............................");

    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: 'b64_json',
    });

// console.log(aiResponse);
// console.log(aiResponse.data.data[0].url);

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;