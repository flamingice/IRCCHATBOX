import app from './src/app.js';

const PORT = process.env.PORT || 3550;

app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running on port ${PORT}`);
});
