import os from "os";

let currentPath = os.homedir();

export const setCurrentPath = (path) => {
    currentPath = path;
}

export const getCurrentPath = () => {
    return currentPath;
}