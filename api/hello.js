// api/hello.js

export default function handler(req, res) {
    try {
        res.status(200).json({ message: 'Hello from Vercel Function!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
