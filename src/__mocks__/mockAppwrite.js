const mockAppwrite = {
    account: {
        create: jest.fn((id = 'testUser1234', email, password, name) => {
            return Promise.resolve({
                $id: id,
                name: name,
                email: email,
            });
        }),
        get: jest.fn(() => {
            return Promise.resolve({
                $id: 'testUser1234',
                name: 'Test User',
                email: 'test@gmail.com',
            });
        }),
        createEmailPasswordSession: jest.fn((email, password) => {
            return Promise.resolve({
                $id: 'session1234',
                userId: 'testUser1234',
                providerUid: email,
            });
        }),
        deleteSessions: jest.fn(() => {
            return Promise.resolve({});
        }),
    },
};

export default mockAppwrite;
