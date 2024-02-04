import path from 'node:path';
import fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { getCurrentPath } from '../currentPath.js'

export const cat = async (args) => {
    if(args.length !== 1) {
        console.log('Invalid input');
        return;
    }
    const pathToFile = path.join(getCurrentPath(), args[0]);

    await new Promise((resolve, reject) => {
        const readStream = createReadStream(pathToFile, { encoding: 'utf8' });
    
        readStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
    
        readStream.on('error', () => {
            reject(new Error(`Operation failed!`));
        });
    
        readStream.on('end', () => {
            resolve();
        });
    });
}

export const add = async (args) => {
    if(args.length !== 1) {
        console.log('Invalid input');
        return;
    }
    try {
        const allPath = path.join(getCurrentPath(), args[0]);
        const fd = await fs.open(`${allPath}`, 'w');
        await fd.close();
        console.log('Empty file created successfully.');
    } catch (err) {
        new Error(`Operation failed`);
    }
}

export const rn = async (args) => {
    if(args.length !== 2) {
        console.log('Invalid input');
        return;
    }

    try {
        const oldPath = path.join(getCurrentPath(), args[0]);
        const newPath = path.join(path.dirname(oldPath), args[1]);
        await fs.rename(oldPath, newPath);
        console.log('File successfully renamed.');
    } catch (err) {
        new Error(`Operation failed`);
    }
};

export const cp = async (args) => {
    if(args.length !== 2) {
        console.log('Invalid input');
        return;
    }

    const oldPath = path.join(getCurrentPath(), args[0]);
    const newPath = path.join(path.dirname(oldPath), args[1]);
    const readStream = createReadStream(oldPath, { encoding: 'utf8' });
    const writeStream = createWriteStream(newPath);
    readStream.pipe(writeStream);

    try {
        await access(oldPath, fs.constants.F_OK);
        await pipeline(readStream, writeStream);
        console.log('File copied successfully.');
    } catch (err) {
        new Error(`Operation failed`);
    }
};

export const mv = async (args) => {
    if(args.length !== 2) {
        console.log('Invalid input');
        return;
    }

    const oldPath = path.join(getCurrentPath(), args[0]);
    const newPath = path.join(path.dirname(oldPath), args[1]);
    const readStream = createReadStream(oldPath, { encoding: 'utf8' });
    const writeStream = createWriteStream(newPath);
    readStream.pipe(writeStream);

    try {
        await access(oldPath, fs.constants.F_OK);
        await pipeline(readStream, writeStream);
        await fs.unlink(oldPath);
        console.log('File moved successfully.');
    } catch (err) {
        new Error(`Operation failed`);
    }
};

export const rm = async (args) => {
    if(args.length !== 1) {
        console.log('Invalid input');
        return;
    }
    const allPath = path.join(getCurrentPath(), args[0]);
    try {
        await fs.unlink(allPath);
        console.log('File deleted successfully.');
    } catch (err) {
        new Error(`Operation failed: ${err.message}`);
    }
};