import {useState, useEffect} from 'react';

export function useDebounce<T>(value:T, delay:number):T{
    const [debouncedValue, setDebouncedValue]=useState<T>(value);
    useEffect(()=>{
        //set a timer to update the value
        const handler = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay);

        //clean up the timer if the value changes(user keeps typing)
        return ()=> {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}