const templateDefinitions = {
    TemplateIdParameter: {
        name: 'id',
        in: 'path',
        description: 'ID шаблона, который нужно получить.',
        required: true,
        schema: {
            type: 'integer',
            example: 1
        }
    },
    TemplateData: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: 'Название шаблона',
                example: 'Шаблон для документации'
            },
            content: {
                type: 'string',
                description: 'Содержимое шаблона',
                example: 'Текст шаблона'
            }
        }
    },
    TemplateCreatedResponse: {
        _links: {
            self: "http://example.com/templates/1"
        },
        template: {
            id: 1,
            createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Дата и время создания шаблона',
                example: '2023-11-01T10:00:00.000Z'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Дата и время последнего обновления шаблона',
                example: '2023-11-10T15:30:00.000Z'
            }
        }
    },
    // пока нигде не используется
    TemplateResponse: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'Уникальный идентификатор шаблона',
                example: 1
            },
            name: {
                type: 'string',
                description: 'Название шаблона',
                example: 'Пример шаблона'
            },
            content: {
                type: 'string',
                description: 'Содержимое шаблона',
                example: 'Содержимое шаблона'
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Дата и время создания шаблона',
                example: '2023-11-01T10:00:00.000Z'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Дата и время последнего обновления шаблона',
                example: '2023-11-10T15:30:00.000Z'
            }
        }
    },
    TemplatesResponse: {
        _links: [
            {
                rel: "self",
                href: "http://example.com/templates/1"
            }
        ],
        templates: [
            {
                id: 1,
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Дата и время создания шаблона',
                    example: '2023-11-01T10:00:00.000Z'
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Дата и время последнего обновления шаблона',
                    example: '2023-11-10T15:30:00.000Z'
                }
            }
        ]
    }
}

module.exports = templateDefinitions;