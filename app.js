import express from 'express';
import lostFoundRoutes from './routes/lostFoundRoutes.js';
import secondHandRoutes from './routes/secondHandRoutes.js';

const app = express();

app.use(express.json());

// Mount routes (no authentication for demo)
app.use('/lost-found', lostFoundRoutes);
app.use('/second-hand', secondHandRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});