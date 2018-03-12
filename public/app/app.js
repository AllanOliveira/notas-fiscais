import {log} from './utils/promise-helpers.js';
import './utils/array-helpers.js';

import {notaService as service} from './nota/service.js';

document
    .querySelector('#myButton')
    .onclick = () => 
        service
        .sumItens('2143')
        .then(log)
        .catch(log);