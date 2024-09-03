export default function handler(request, response) {
    console.log('hello');
    response.status(200).json({ message: 'Hello from Vercel Function!' });
}
