// const mockAppwrite = {
// account: {
//     create: jest.fn((id = 'testUser1234', email, password, name) => {
//         return Promise.resolve({
//             $id: id,
//             name: name,
//             email: email,
//         });
//     }),
//     get: jest.fn(() => {
//         return Promise.resolve({
//             $id: 'testUser1234',
//             name: 'Test User',
//             email: 'test@gmail.com',
//         });
//     }),
//     createEmailPasswordSession: jest.fn((email, password) => {
//         return Promise.resolve({
//             $id: 'session1234',
//             userId: 'testUser1234',
//             providerUid: email,
//         });
//     }),
//     deleteSessions: jest.fn(() => {
//         return Promise.resolve({});
//     }),
// },
// };
// export default mockAppwrite;

class Account {
    constructor(client) {
        this.client = client;
        this.create = jest.fn((userId, email, password, name) => {
            return Promise.resolve({
                $id: userId,
                name: name,
                email: email,
            });
        });
        this.get = jest.fn(() => {
            return Promise.resolve({
                $id: 'testUser1234',
                name: 'Test User',
                email: 'test@gmail.com',
            });
        });
        this.createEmailPasswordSession = jest.fn((email, password) => {
            return Promise.resolve({
                $id: 'session1234',
                userId: 'testUser1234',
                providerUid: email,
            });
        });
        this.deleteSessions = jest.fn(() => {
            return Promise.resolve({});
        });
    }
}
class Client {
    constructor() {
        this.setEndpoint = jest.fn((endpoint) => {
            return this;
        });
        this.setProject = jest.fn((project) => {
            return this;
        });
    }
}

class ID {
    static unique() {
        return 'testUser1234';
    }
}
class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint('https://cloud.example.io/v1')
            .setProject('7221nx9ie9tsm4fpk4fj');
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
                //call login method once user is created
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

            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser error ::  ', error);
        }

        return null; // if there is no current user or error return null, handle in frontend
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log('Session has been deleted successfully.');
            return true; // Indicates success
        } catch (error) {
            console.log('Appwrite service :: logout error :: ', error);
        }
    }
}

const appwriteAuthServiceMock = new AuthService();

export default appwriteAuthServiceMock;
