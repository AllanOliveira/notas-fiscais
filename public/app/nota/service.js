import {handleStatus,log} from '../utils/promise-helpers.js';
import {partialaze,compose} from '../utils/operations.js';

const API = '/notas';

const getItensFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItensByCode = (code,itens) => itens.filter(item=> item.codigo === code);
const sumItensValue = itens => itens.reduce((total,item) => total + item.valor,0);

const sumItens = code => {
    return notas => notas.$flatMap(nota => nota.itens)
                         .filter((item)=> item.codigo == code)
                         .reduce((total,item) => total + item.valor,0);
}

export const notaService = {
    listAll(){
        return fetch(API).then(handleStatus)
    },
    sumItens(code){
       /*const filterItems = partialaze(filterItensByCode,code);
       return this.listAll()
                        .then(getItensFromNotas)
                        .then(filterItems)
                        .then(sumItensValue);*/

        const sumItens = compose(
                            sumItensValue,
                            partialaze(filterItensByCode,code),
                            getItensFromNotas);
                            
        return this.listAll().then(sumItens)

    }
}