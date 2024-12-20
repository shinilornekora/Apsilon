const errorDefinitions = {
    BadRequestError: {
        description: "Плохой запрос (ошибка валидации)",
        schema: {
            status: "error",
            message: "Описание ошибки"
        }
    },
    NotFoundError: {
        description: "Ресурс не найден",
        schema: {
            status: "error",
            message: "Ресурс не найден"
        }
    },
    InternalServerError: {
        description: "Внутренняя ошибка сервера",
        schema: {
            status: "error",
            message: "Oops, error occurred, no templates for you!"
        }
    }
};

module.exports = errorDefinitions;
