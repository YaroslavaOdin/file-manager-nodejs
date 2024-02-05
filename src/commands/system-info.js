import os from "os";
import { checkArgumentsCount } from '../helpers/utils.js';

export const systenInfo = async (args) => {
    if (checkArgumentsCount(args, 1)) return;
    switch (args[0]) {
        case '--EOL':
            console.log('EOL: ' + JSON.stringify(os.EOL));
            break;
        case '--cpus':
            const machineCPUs = await os.cpus();
            const CPUsInfo = machineCPUs.map((item) => ({ Model: item.model, clockRate: `${ item.speed / 1000 } GHz` }));
            console.log('Overall amount of CPUS: ' + machineCPUs.length);
            console.table(CPUsInfo);
            break;
        case '--homedir':
            console.log('Home directory: ' + os.homedir());
            break;
        case '--username':
            console.log('System user name: ' + os.userInfo().username);
            break;
        case '--architecture':
            console.log('CPU architecture: ' + os.arch());
            break;
        default: 
            console.log('Invalid input');
            break;
    }
}