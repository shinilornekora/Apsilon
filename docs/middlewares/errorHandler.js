// errorHandler.js
module.exports = function errorHandler(err, req, res) {
    console.error(err); // Логируем ошибку (можно интегрировать с логгером, например, Winston)

    // Пример обработки различных типов ошибок
    if (err.name === 'InvalidArgumentException') {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    if (err.name === 'NotFoundException') {
        return res.status(404).json({
            status: 'error',
            message: 'Resource not found.'
        });
    }

    // Обработка ошибок по умолчанию
    res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
};
