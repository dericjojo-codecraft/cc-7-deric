const map = <T>(array:T[], transform: (item: T) => T):T[] => { 
    return array.reduce((acc: T[], item: T) => {
        acc.push(transform(item));
        return acc;
    }, []);
}

const filter = <T> (array:T[], predicate:(item:T) => boolean): T[] =>{
    return array.reduce((acc: T[], item: T) => {
        if (predicate(item)) {
            acc.push(item);
        }
        return acc;
    }, []);
}
