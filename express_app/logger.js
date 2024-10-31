const colors = {
    red: "\x1b[41m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    gray: "\x1b[100m"
}

const colorMatch = {
    RABBIT_MQ: 'red',
    SERVER: 'green',
    GRAPH_QL: 'cyan',
    DEFAULT: 'gray'
}

module.exports = class Logger {
    constructor(name = 'DEFAULT') { 
        this.name = name;
    }

    log(message) {
        console.log(colors[colorMatch[this.name] ?? 'gray'], `[${this.name}]: ${message}`, "\x1b[0m");
    }
}
