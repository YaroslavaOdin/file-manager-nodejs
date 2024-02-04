import fs from 'node:fs/promises';
import path from 'node:path';
import { getCurrentPath, setCurrentPath } from '../currentPath.js'

export const up = async () => {
    const newPath = path.join(getCurrentPath(), '..');
    setCurrentPath(newPath);
}

export const cd = async (args) => {
    const newPath = path.resolve(getCurrentPath(), args[0]);
    if(await isPathExist(newPath)) {
        setCurrentPath(newPath);
    } else console.log(`This path does not exist.`);
}

export const ls = async () => {
    const directoryContent = await fs.readdir(getCurrentPath(), { withFileTypes: true });
    const folders = directoryContent.filter(content => !content.isFile()).sort();
    const files = directoryContent.filter(content => content.isFile()).sort();
    let sortedList = folders.concat(files);
    sortedList = sortedList.map((dir) => ({ Name: dir.name, Type: dir.isFile() ? 'file' : 'directory' }));

    console.table(sortedList);
}

export const isPathExist = async (path) => {
    try {
        const stat = await fs.stat(path);
        return stat.isDirectory();
    } catch (err) {
        new Error(`Operation failed`);
    }
}