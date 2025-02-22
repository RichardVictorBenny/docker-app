const express = require('express');
const app = express();
const port = 3000; 
const fs = require('fs');
const path = require('path');
const winston = require('winston');

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: path.join(logDir, 'app.log') })
    ]
});

// Log a test message
logger.info('Application started and logging is working!');

logger.info('Server is running...');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    logger.info(`Server is running on port ${port}`);
    });