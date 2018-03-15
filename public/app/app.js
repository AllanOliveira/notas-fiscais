import {log,timeOutPromisse,delay,retry} from './utils/promise-helpers.js';
import './utils/array-helpers.js';

import {notaService as service} from './nota/service.js';
import {takeUntil,debounceTime,partialaze,pipe} from './utils/operations.js';

const operations = pipe(
    partialaze(takeUntil,3),
    partialaze(debounceTime,500)
);

const action = operations(
    ()=>{
        retry(3,3000,() => timeOutPromisse(200,service.sumItens('2143')))
        .then(console.log)
        .catch(console.log);
    }
);

document
    .querySelector('#myButton')
    .onclick = action;