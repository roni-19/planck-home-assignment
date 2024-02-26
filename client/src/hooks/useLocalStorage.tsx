import { useEffect, useState } from "react";
function getStorageValue(key: string, defaultValue: any) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });
    //when key changes update the value
    useEffect(() => {
        const value = getStorageValue(key, defaultValue)
        setValue(value)
    }, [key]);

    //when key or value changes, set item in local storage
    useEffect(() => {
        if (key) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, JSON.stringify(value)]);

    return [value, setValue];
};