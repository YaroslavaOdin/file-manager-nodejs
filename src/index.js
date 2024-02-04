import * as readline from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';
import { commands } from './commands.js'
import  { getCurrentPath } from './currentPath.js'

const userName = getUserName();

const start = async () => {
    const rl = readline.createInterface({ input, output });
    console.log(`Welcome to the File Manager, ${ userName }!`);
    console.log(`You are currently in ${ getCurrentPath() }`);

    rl.on('line', async (input) => {
        if (input === '.exit') {
            rl.close();
        } else {
            await commands(input);
            console.log(`\n You are currently in ${ getCurrentPath() }`);
        }
    });
    
    rl.on('close', () => {
        console.log(`Thank you for using File Manager, ${ userName }, goodbye!`);
    });
}

await start();


// get username block
function getUserName() {
    const UserNameVar = process.argv.find((item) => item.startsWith('--username'));
    return UserNameVar?.split('=')[1] || 'Default User';
}
