const mockAppwrite = {
    account: {
        get: jest.fn(() =>
            Promise.resolve({
                $id: 'testUser1234',
                name: 'Test User',
                email: 'test@gmail.com',
            }),
        ),
        createEmailPasswordSession: jest.fn((email, password) =>
            Promise.resolve(),
        ),
    },
};
