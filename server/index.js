const express = require('express');
const app = express();
const cors=require('cors');

app.use(express.json());
app.use(cors());

// Sample user details
const USER_ID = "Devak_Reddy_05082004";
const EMAIL = "devakreddy.chilaka2021@vitstudent.ac.in";
const ROLL_NUMBER = "21BCE2940";

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];
        
        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        
        // Find the highest lowercase alphabet
        const lowerCaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
        const highestLowercase = lowerCaseAlphabets.length > 0 ? lowerCaseAlphabets.sort().reverse()[0] : null;

        const response = {
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
        };
        
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ is_success: false, message: error.message });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
