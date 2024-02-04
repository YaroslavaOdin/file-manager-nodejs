import { ls, up, cd } from './modules/nwd.js';
import { cat, add, rm } from './modules/fs.js'
import { systenInfo } from './modules/system-info.js'

export const commands = async (input) => {
    const parsedInput = input.trim().split(' ')

    const command = parsedInput[0];
    const args = parsedInput.slice(1);

    switch (command) {
        case 'up':
            await up();
            break;

        case 'cd':
            await cd(args);
            break;

        case 'ls':
            await ls();
            break;

        case 'cat':
            await cat(args);
            break;
            
        case 'add':
            await add(args);
            break;
        
        case 'rn':
            await cat(args);
            break;

        case 'cp':
            await cat(args);
            break;
        
        case 'mv':
            await rm(args);
            break;

        case 'rm':
            await rm(args);
            break;

        case 'os':
            await systenInfo(args);
            break;

        default: 
            console.log('Invalid input');
            break;
    }
}
