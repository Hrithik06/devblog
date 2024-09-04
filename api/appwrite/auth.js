import { Client, Account, ID } from 'appwrite';

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
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(
                email,
                password,
            );
            let currentUser;
            if (session) {
                currentUser = this.getCurrentUser();
                // if (currentUser) {
                //     const jwtResponse = await this.account.createJWT();
                //     console.log(jwtResponse);
                // }
                console.log(currentUser);
            }
            return currentUser;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser error :: ', error);
        }
        return null; // Handle in frontend
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log('Appwrite service :: logout error :: ', error);
        }
    }
}

// Vercel Function handler
export default async function handler(req, res) {
    const authService = new AuthService();

    try {
        const { action, email, password, name } = req.body;
        let result;

        switch (action) {
            case 'createAccount':
                result = await authService.createAccount({
                    email,
                    password,
                    name,
                });
                break;
            case 'login':
                result = await authService.login({ email, password });
                break;
            case 'getCurrentUser':
                result = await authService.getCurrentUser();
                break;
            case 'logout':
                result = await authService.logout();
                break;
            default:
                return res.status(400).json({ message: 'Invalid action' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in Appwrite function:', error);
        return res.status(500).json({ error: error.message });
    }
}
