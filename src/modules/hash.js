import path from 'node:path';
import crypto from 'crypto';
import { createReadStream } from 'fs';
import { getCurrentPath } from '../currentPath.js'

export const hash = async (args) => {
    if(args.length !== 1) {
        console.log('Invalid input');
        return;
    }

    const fullFilePath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
    const hash = crypto.createHash('sha256');

    await new Promise((resolve, reject) => {
        const readStream = createReadStream(fullFilePath);

        readStream.on('data', function(fileHash) {
            hash.update(fileHash);
        });

    
        readStream.on('error', () => {
            reject(new Error(`Operation failed!`));
        });
    
        readStream.on('end', () => {
            const fileHash = hash.digest('hex');
            console.log(`Hash of ${ fullFilePath }: ` + fileHash);
            resolve();
        });
    });
}