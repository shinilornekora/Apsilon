import fs from 'fs';
import * as cheerio from 'cheerio';

/**
 * Функция для обновления содержимого HTML-файла в указанной ноде
 * @param {string} htmlFilePath Путь к HTML-файлу
 * @param {Object} message Данные для вставки в HTML
 * @param {string} nodeId ID ноды для обновления содержимого
 */
export function updateHtmlNode({ message }) {
    const msg = JSON.parse(message);

    fs.appendFile('./data.txt', `${msg.template_name} ${msg.status}\n`, () => {});
}
