export const partialaze = (fn,...args) => fn.bind(null,...args);

export const compose = (...fns) => value =>
            fns.reduceRight((previousValue,fn) => fn(previousValue),value);