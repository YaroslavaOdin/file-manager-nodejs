import path from 'node:path';
import crypto from 'crypto';
import { createReadStream } from 'fs';
import { checkArgumentsCount, error, getCurrentPath, currentPathMessage } from '../helpers/utils.js';

export const hash = async (args) => {
    if (checkArgumentsCount(args, 1)) return;

    const fullFilePath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
    const hash = crypto.createHash('sha256');

    await new Promise((resolve) => {
        const readStream = createReadStream(fullFilePath);

        readStream.on('data', function(fileHash) {
            hash.update(fileHash);
        });

    
        readStream.on('error', (err) => {
            error(err);
            currentPathMessage();
        });
    
        readStream.on('end', () => {
            const fileHash = hash.digest('hex');
            console.log(`Hash of ${ fullFilePath }: ` + fileHash);
            currentPathMessage();
            resolve();
        });
    });
}