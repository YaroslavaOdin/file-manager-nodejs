import path from 'node:path';
import fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { checkArgumentsCount, error, getCurrentPath, currentPathMessage } from '../helpers/utils.js';

export const cat = async (args) => {
    if (checkArgumentsCount(args, 1)) return;
    const pathToFile = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);

    await new Promise((resolve) => {
        const readStream = createReadStream(pathToFile, { encoding: 'utf8' });
    
        readStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
    
        readStream.on('error', (err) => {
            error(err);
            currentPathMessage();
        });
    
        readStream.on('end', () => {
            resolve();
            currentPathMessage();
        });
    });
}

export const add = async (args) => {
    if (checkArgumentsCount(args, 1)) return;
    try {
        const allPath = path.join(getCurrentPath(), args[0]);
        const fd = await fs.open(`${allPath}`, 'w');
        await fd.close();
        console.log('Empty file created successfully.');
        currentPathMessage();
    } catch (err) {
        error(err);
        currentPathMessage();
    }
}

export const rn = async (args) => {
    if (checkArgumentsCount(args, 2)) return;

    try {
        const oldPath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
        const newPath = path.join(path.dirname(oldPath), args[1]);
        await fs.rename(oldPath, newPath);
        console.log('File successfully renamed.');
        currentPathMessage();
    } catch (err) {
        error(err);
        currentPathMessage();
    }
};

export const cp = async (args) => {
    if (checkArgumentsCount(args, 2)) return;

    const oldPath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
    const newPath = path.isAbsolute(args[1]) ? args[1] : path.join(path.dirname(oldPath), args[1]);
    const readStream = createReadStream(oldPath, { encoding: 'utf8' });
    const writeStream = createWriteStream(newPath);

    readStream.on('error', (err) => { error(err); currentPathMessage();});
    writeStream.on('error', (err) => { error(err); currentPathMessage();});

    const stream = readStream.pipe(writeStream);

    stream.on('finish', () => {
        console.log('File copied successfully.');
        currentPathMessage();
    });
};

export const mv = async (args) => {
    if (checkArgumentsCount(args, 2)) return;

    const oldPath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
    const newPath = path.isAbsolute(args[1]) ? args[1] : path.join(path.dirname(oldPath), args[1]);
    const readStream = createReadStream(oldPath, { encoding: 'utf8' });
    const writeStream = createWriteStream(newPath);

    readStream.on('error', (err) => { error(err); currentPathMessage();});
    writeStream.on('error', (err) => { error(err); currentPathMessage();});

    const stream = readStream.pipe(writeStream);

    stream.on('finish', async () => {
        await fs.unlink(oldPath);
        console.log('File moved successfully.');
        currentPathMessage();
    });
};

export const rm = async (args) => {
    if (checkArgumentsCount(args, 1)) return;
    const allPath = path.isAbsolute(args[0]) ? args[0] : path.join(getCurrentPath(), args[0]);
    try {
        await fs.unlink(allPath);
        console.log('File deleted successfully.');
        currentPathMessage();
    } catch (err) {
        error(err);
        currentPathMessage();
    }
};