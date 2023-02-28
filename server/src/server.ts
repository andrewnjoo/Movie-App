import app from './app';

const PORT = process.env.PORT || 5420;

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
