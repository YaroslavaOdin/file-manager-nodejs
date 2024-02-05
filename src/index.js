import * as readline from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';
import { commands } from './commands.js'
import { getUserName, currentPathMessage } from './helpers/utils.js';

const userName = await getUserName();

const start = async () => {
    const rl = readline.createInterface({ input, output });
    console.log(`Welcome to the File Manager, ${ userName }!`);
    currentPathMessage();

    rl.on('line', async (input) => {
        if (input === '.exit') {
            rl.close();
        } else {
            await commands(input);
        }
    });
    
    rl.on('close', () => {
        console.log(`\n Thank you for using File Manager, ${ userName }, goodbye!`);
    });
}

await start();