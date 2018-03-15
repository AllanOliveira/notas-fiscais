export const handleStatus = res =>
    res.ok ? res.json() : Promise.reject(res.statusText);

export const log = param => {
    console.log(param);
    return param
}

export const timeOutPromisse = (milliseconds, promise) =>{
    
    const timeOut= new Promise((resolve,reject) => {
        setTimeout(
            () => reject(`A requisião demorou mais que ${milliseconds} e foi encerrada.`),
            milliseconds
        )
    });

    return Promise.race([timeOut,promise]);
}

export const delay = milliseconds => 
    resultado =>
        new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(resultado)
            },milliseconds);
        }
    );

export const retry = (times,milliseconds,fn) =>
    fn().catch(erro =>{
        return delay(milliseconds)()
            .then( 
                () => 
                    times > 1 
                    ? retry(--times,milliseconds,fn) 
                    : Promise.reject(erro)
            );
    });
        