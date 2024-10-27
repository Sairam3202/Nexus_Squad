require('dotenv').config(); // Load environment variables from .env file
// require('dotenv').config({ path: require('D:\\WEB DEVELOPMENT\\Vitaura\\chatbot-project\\.env').resolve(__dirname, '.env') });


console.log("Your OpenAI API Key is:", process.env.OPENAI_API_KEY);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Endpoint to handle chat requests
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Call OpenAI API
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Extract the response and send it back to the client
        const chatGptResponse = response.data.choices[0].message.content;
        res.json({ message: chatGptResponse });
    } catch (error) {
        // Handle errors and log them
        console.error('Error communicating with ChatGPT:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// require('dotenv').config();

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// app.post('/api/chat', async (req, res) => {
//     const userMessage = req.body.message;

//     try {
//         const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//             model: 'gpt-3.5-turbo',
//             messages: [{ role: 'user', content: userMessage }],
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         const chatGptResponse = response.data.choices[0].message.content;
//         res.json({ message: chatGptResponse });
//     } catch (error) {
//         console.error('Error communicating with ChatGPT:', error.response ? error.response.data : error.message);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

















// require('dotenv').config(); // Import and configure dotenv
// const { Configuration, OpenAIApi } = require('openai');

// // Create a configuration object using the API key from the .env file
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// // Example function to call the ChatGPT API
// async function getChatGPTResponse(prompt) {
//     try {
//         const response = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: prompt,
//             max_tokens: 100,
//         });
//         console.log(response.data.choices[0].text);
//     } catch (error) {
//         console.error("Error communicating with ChatGPT:", error.response.data);
//     }
// }

// // Example usage
// getChatGPTResponse("Hello, how are you?");
