import path from 'node:path';
import fs from 'node:fs/promises';
import { constants } from 'fs';
import { getCurrentPath, setCurrentPath } from '../currentPath.js'

export const isFileExist = async (file) => {
    try {
        await fs.access(file, constants.F_OK);
        console.log('file exists');
    } catch {
        console.error('file does not exists');
    }
}

export const cat = async (args) => {
    const pathToFile = path.resolve(args[0]);
    
    if (!(await fs.access(path))) {
        throw new Error(`Operation failed`);
    }

    const readStream = fs.createReadStream(pathToFile, { encoding: 'utf8' });
    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });
    readStream.on('error', (err) => {
        throw new Error(`Operation failed: ${err.message}`);
    });
}

export const add = async (args) => {
    try {
        const allPath = path.join(getCurrentPath(), args[0]);
        const fd = await fs.open(`${allPath}`, 'w');
        await fd.close();
    } catch (err) {
        throw new Error(`Operation failed: ${err.message}`);
    }
}

export const rm = async (args) => {
    const pathToFile = path.resolve(args[0]);
    try {
        await fs.unlink(pathToFile);
    } catch (error) {
        throw new Error(`Operation failed: ${err.message}`);
    }
};