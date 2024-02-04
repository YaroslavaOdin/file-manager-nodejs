import { ls, up, cd } from './modules/nwd.js';
import { cat, add, rn, cp, mv, rm } from './modules/fs.js'
import { systenInfo } from './modules/system-info.js'
import { hash } from './modules/hash.js'
import { compress, decompress } from './modules/brotly.js'

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
            await rn(args);
            break;

        case 'cp':
            await cp(args);
            break;
        
        case 'mv':
            await mv(args);
            break;

        case 'rm':
            await rm(args);
            break;

        case 'os':
            await systenInfo(args);
            break;

        case 'hash':
            await hash(args);
            break;

        case 'compress':
            await compress(args);
            break;

        case 'decompress':
            await decompress(args);
            break;

        default: 
            console.log('Invalid input');
            break;
    }
}
