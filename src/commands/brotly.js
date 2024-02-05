import path from 'node:path';
import zlib from 'node:zlib';
import { createReadStream, createWriteStream } from 'fs';
import { getCurrentPath, checkArgumentsCount, error, currentPathMessage } from '../helpers/utils.js'

export const compress = async (args) => {
    if (checkArgumentsCount(args, 2)) return;

    const fullFilePath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
    const fullNewFilePath = path.isAbsolute(args[1]) ? args[1] : path.join(getCurrentPath(), args[1]);

    const readStream = createReadStream(fullFilePath);
    const writeStream = createWriteStream(fullNewFilePath);
    readStream.on('error', (err) => { error(err); currentPathMessage();});
    writeStream.on('error', (err) => { error(err); currentPathMessage();});

    const brotli = zlib.createBrotliCompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
        console.log('Done compressing.');
        currentPathMessage();
    });

    stream.on('error', (err) => {
        error(err);
        currentPathMessage();
    });
}

export const decompress = async (args) => {
    if (checkArgumentsCount(args, 2)) return;

    const fullFilePath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
    const fullNewFilePath = path.isAbsolute(args[1]) ? args[1] : path.join(getCurrentPath(), args[1]);

    const readStream = createReadStream(fullFilePath);
    const writeStream = createWriteStream(fullNewFilePath);
    readStream.on('error', (err) => { error(err); currentPathMessage();});
    writeStream.on('error', (err) => { error(err); currentPathMessage();});

    const brotli = zlib.createBrotliDecompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
        console.log('Done decompressing.');
        currentPathMessage();
    });

    stream.on('error', (err) => {
        error(err);
        currentPathMessage();
    });
}