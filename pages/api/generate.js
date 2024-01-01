import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`Message:
Noise Mettalix Elite edition
Metal body
Metal strap
1.4 HD Display
Functional Crown

Output:
ITEM NAME: Noise Mettalix Elite edition
PRICE: N/A
FEATURES: Metal body, Metal strap, 1.4 HD Display, Functional Crown
AVAILABLE: YES
QUANTITY: 0

Message:
One plus bullet z2 avb 1250 last @750 one shot deal

Output:
ITEM NAME: One plus bullet z2
PRICE: 750
AVAILABLE: YES
QUANTITY: 1250


Message:
NORD BUDS COMPANY SEALED AVAILABLE 80PCS AT AGGRESSIVE PRICE

Output:
ITEM NAME: NORD BUDS
PRICE: N/A
AVAILABLE: YES
QUANTITY: 80

Message:
`;
const generateAction = async (req, res) => {
  // Run first prompt
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
