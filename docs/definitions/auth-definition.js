const authDefinition = {
    LoginRequest: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                description: 'Имя пользователя, которое используется для входа.',
                example: 'john_doe'
            },
            password: {
                type: 'string',
                description: 'Пароль пользователя для аутентификации.',
                example: 'password123'
            },
        },
        required: ['username', 'password']
    },
    LoginResponse: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                description: 'JWT токен для аутентификации пользователя.',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA4NjM0OTY4LCJleHBpcmVkX2luIjoxNjA4NjQwOTY4fQ.kDXbxL92w6ql-Lj9W9Hb2TjF1P0aPQFiFhK4n4v5Vt8'
            },
        },
        required: ['token']
    },

    RegisterRequest: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                description: 'Имя пользователя, которое используется для входа.',
                example: 'john_doe'
            },
            password: {
                type: 'string',
                description: 'Пароль пользователя для аутентификации.',
                example: 'password123'
            },
            role: {
                type: 'string',
                description: 'Роль пользователя в системе',
                example: 'admin'
            },
        },
        required: ['username', 'password', 'role']
    },
    RegisterResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Сообщение об успешной регистрации.',
                example: 'User registered successfully'
            },
            userId: {
                type: 'integer',
                description: 'ID зарегистрированного пользователя.',
                example: 1
            }
        },
        required: ['message', 'userId']
    },
}

module.exports = authDefinition;
