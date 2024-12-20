const publishDefinition = {
    PublishIdParameter: {
        name: 'id',
        in: 'path',
        description: 'ID публикации, который нужно получить.',
        required: true,
        schema: {
            type: 'integer',
            example: 1
        }
    },
    PublishRequest: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'Уникальный идентификатор запроса на публикацию.',
                example: 1
            },
            status: {
                type: 'string',
                description: 'Статус публикации.',
                example: 'pending',
                default: 'pending'
            },
            author: {
                type: 'string',
                description: 'Имя автора, создавшего запрос.',
                example: 'user123'
            },
            templateId: {
                type: 'integer',
                description: 'Идентификатор шаблона, связанного с запросом.',
                example: 42
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Дата и время создания запроса.',
                example: '2023-11-29T10:00:00.000Z'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Дата и время последнего обновления запроса.',
                example: '2023-11-29T12:00:00.000Z'
            }
        }
        // поле, для описания обязательных данных:
        // required: ['status', 'author', 'templateId', 'createdAt', 'updatedAt']
    },
    PublishRequestCreate: {

    },
    PublishRequestResponse: {
        _links: {
            href: {
                type: 'string',
                description: 'Ссылка на детали созданного запроса публикации',
                example: 'http://example.com/publish_requests/1/details'
            }
        },
        publishRequest: {
            id: {
                type: 'integer',
                description: 'Идентификатор созданного запроса публикации',
                example: 1
            },
            status: {
                type: 'string',
                description: 'Текущий статус запроса публикации',
                example: 'pending'
            },
        }
    },
    PublishListResponse: {
        _links: [
            {
                rel: "self",
                href: "http://example.com/templates/1"
            }
        ],
        publish: [
            {
                id: {
                    type: 'integer',
                    description: 'Идентификатор созданного запроса публикации',
                    example: 1
                },
                status: {
                    type: 'string',
                    description: 'Текущий статус запроса публикации',
                    example: 'pending'
                },
            }
        ]
    },
}

module.exports = publishDefinition;
