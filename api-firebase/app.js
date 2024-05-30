const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware para parsear JSON en el cuerpo de la solicitud

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});