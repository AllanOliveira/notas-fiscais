import {handleStatus,log} from '../utils/promise-helpers.js';
import {partialaze,pipe} from '../utils/operations.js';

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
        return fetch(API)
                .then(handleStatus)
                .catch(erro => {
                    console.log(erro);
                    return Promise.reject('Não foi possível obter as notas fiscais');
                });;
    },
    sumItens(code){

        const sumItens = pipe(
            getItensFromNotas,
            partialaze(filterItensByCode,code),
            sumItensValue
        );
                            
        return this.listAll().then(sumItens);

    }
}