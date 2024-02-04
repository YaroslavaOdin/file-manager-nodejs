import path from 'node:path';
import zlib from 'node:zlib';
import { createReadStream, createWriteStream } from 'fs';
import { getCurrentPath } from '../currentPath.js'

export const compress = async (args) => {
    if(args.length !== 2) {
        console.log('Invalid input');
        return;
    }

    const fullFilePath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
    const fullNewFilePath = path.isAbsolute(args[1]) ? args[1] : path.join(getCurrentPath(), args[1]);

    const readStream = createReadStream(fullFilePath);
    const writeStream = createWriteStream(fullNewFilePath);

    const brotli = zlib.createBrotliCompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
        console.log('Done compressing.');
    });

    stream.on('error', () => {
        new Error(`Operation failed!`);
    });
}

export const decompress = async (args) => {
    if(args.length !== 2) {
        console.log('Invalid input');
        return;
    }

    const fullFilePath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
    const fullNewFilePath = path.isAbsolute(args[1]) ? args[1] : path.join(getCurrentPath(), args[1]);

    const readStream = createReadStream(fullFilePath);
    const writeStream = createWriteStream(fullNewFilePath);

    const brotli = zlib.createBrotliDecompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
        console.log('Done decompressing.');
    });

    stream.on('error', () => {
        new Error(`Operation failed!`);
    });
}