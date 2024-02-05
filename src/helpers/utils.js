import fs from 'node:fs/promises';
import os from 'os';

let currentPath = os.homedir();

export const setCurrentPath = (path) => {
    currentPath = path;
}

export const getCurrentPath = () => {
    return currentPath;
}

export const isPathExist = async (path) => {
    try {
        const stat = await fs.stat(path);
        return stat.isDirectory();
    } catch (err) {
        error(err);
    }
}

export const getUserName = async () => {
    const UserNameVar = process.argv.find((item) => item.startsWith('--username'));
    return UserNameVar?.split('=')[1] || 'Default User';
}

export const checkArgumentsCount = (args, expectedCount) => {
    if(args.length !== expectedCount) {
        console.log('Invalid input');
        currentPathMessage();
        return true;
    } else return false;
}

export const error = (err) => {
    console.log(`Operation failed: ${err.message}`);
};

export const currentPathMessage = () => console.log(`\n You are currently in ${ getCurrentPath() }`);