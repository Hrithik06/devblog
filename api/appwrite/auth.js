import { Client, Account, ID } from 'appwrite';
import jwt from 'jsonwebtoken';
import { serialize, parse } from 'cookie';

// Define AuthService class
class AuthService {
    constructor() {
        this.client = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT)
            .setProject(process.env.APPWRITE_PROJECT_ID);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name,
            );
            if (userAccount) {
                console.log('User account created:', userAccount);
                const loginData = await this.login({ email, password });
                console.log(loginData);
                return loginData;
            } else {
                return null;
            }
        } catch (error) {
            console.error(
                'Appwrite service :: Error creating account:: ',
                error,
            );
            throw new Error('Failed to create account.');
        }
    }

    async login({ email, password }) {
        console.log(this.account);

        try {
            const session = await this.account.createEmailPasswordSession(
                email,
                password,
            );
            if (session) {
                // Generate JWT
                const token = jwt.sign(
                    { userId: session.userId, sessionId: session.$id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' },
                );
                // Verify JWT
                // const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                const userId = decodedToken.userId;
                const sessionId = decodedToken.sessionId;
                console.log('Login fun: ', userId, sessionId);

                return token;
            }

            return null;
        } catch (error) {
            console.error('Appwrite service :: Error logging in:: ', error);
            throw new Error('Failed to log in.');
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser error :: ', error);
            throw new Error('Failed to get current user.');
        }
        return null; // Handle in frontend
    }

    async logout() {
        console.log('logout Function');
        console.log(this.account);
        return true;
        // try {
        //     await this.account.deleteSessions();
        //     console.log('Session has been deleted successfully.');
        //     return true; // Indicates success
        // } catch (error) {
        //     console.log('Appwrite service :: logout error :: ', error);
        //     throw new Error('Failed to log out.');
        // }
    }
}

// Vercel Function handler
export default async function handler(req, res) {
    const authService = new AuthService();
    try {
        const { action, email, password, name } = req.body;
        let result;
        let cookie;

        switch (action) {
            case 'createAccount':
                const newAccountJWT = await authService.createAccount({
                    email,
                    password,
                    name,
                });

                if (newAccountJWT) {
                    const maxAge = 60 * 60 * 24 * 7; // 7 days in seconds
                    const expires = new Date(Date.now() + maxAge * 1000);
                    const cookieOptions = {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        path: '/',
                        maxAge: maxAge,
                        expires: expires,
                    };
                    cookie = serialize('token', newAccountJWT, cookieOptions);
                    res.setHeader('Set-Cookie', cookie);
                    result = res
                        .status(201)
                        .json({ message: 'Account creation success' });
                } else {
                    result = res
                        .status(400)
                        .json({ message: 'Account creation failed' });
                }
                break;
            case 'login':
                const loginJWT = await authService.login({
                    email,
                    password,
                });
                if (loginJWT) {
                    const maxAge = 60 * 60 * 24 * 7; // 7 days in seconds
                    const expires = new Date(Date.now() + maxAge * 1000);
                    const cookieOptions = {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        path: '/',
                        maxAge: maxAge,
                        expires: expires,
                    };
                    cookie = serialize('token', loginJWT, cookieOptions);
                    res.setHeader('Set-Cookie', cookie);
                    result = res.status(200).json({ message: 'Login success' });
                } else {
                    result = res
                        .status(401)
                        .json({ message: 'Invalid login credentials' });
                }
                break;
            case 'getCurrentUser':
                const user = await authService.getCurrentUser();
                if (user) {
                    result = res.status(200).json(user);
                } else {
                    result = res
                        .status(401)
                        .json({ message: 'User not authenticated' });
                }
            case 'logout':
                const cookies = parse(req.headers.cookie || '');
                console.log(cookies);

                // Access specific cookie

                const token = cookies.token;
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                const userId = decodedToken.userId;
                const sessionId = decodedToken.sessionId;
                console.log('Logout API: ', userId, sessionId);

                const logoutSuccess = await authService.logout(sessionId);
                // console.log(logoutSuccess);

                if (logoutSuccess) {
                    cookie = serialize('token', '', {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        path: '/',
                        expires: new Date(0),
                    });
                    res.setHeader('Set-Cookie', cookie);
                    result = res
                        .status(200)
                        .json({ message: 'Logout success' });
                } else {
                    result = res.status(500).json({ message: 'Logout failed' });
                }

                break;
            default:
                return res.status(400).json({ message: 'Invalid action' });
        }

        return result;
    } catch (error) {
        console.error('Error in Appwrite function:', error);
        return res.status(500).json({ error: error.message });
    }
}
