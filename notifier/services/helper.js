function resolveMessageWithRating(message) {
    const regex = /template_name:\s?"(.*?)"\s*author:\s?"(.*?)"\s*status:\s?"(.*?)"\s*comment:\s?"(.*?)"\s*rating:\s?(\d+)/;
    const match = message.match(regex);

    if (match) {
        const [, templateName, author, status, comment, rating] = match;

        return {
            template_name: templateName,
            author: author,
            status: status,
            comment: comment,
            rating: parseInt(rating, 10),
        };
    } else {
        console.error("Не удалось распарсить строку с rating.");
        return null;
    }
}

function resolveMessageWithoutRating(message) {
    const regex = /template_name:\s?"(.*?)"\s*author:\s?"(.*?)"\s*status:\s?"(.*?)"\s*description:\s?"(.*?)"/;
    const match = message.match(regex);

    if (match) {
        const [, templateName, author, status, description] = match;

        const decodedDescription = decodeURIComponent(escape(description));

        return {
            template_name: templateName,
            author: author,
            status: status,
            description: decodedDescription,
        };
    } else {
        console.error("Не удалось распарсить строку без rating.");
        return null;
    }
}

export function resolveMessage(message) {
    const msg = message.includes('rating:') 
        ? resolveMessageWithRating(message)
        : resolveMessageWithoutRating(message)

    return JSON.stringify(msg);
}
