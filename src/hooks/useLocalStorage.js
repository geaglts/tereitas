function useLocalStorage({ key, value }) {
    const getValue = () => {
        const rawValue = window.localStorage.getItem(key);
        const parsedValue = JSON.parse(rawValue);
        setValue(parsedValue, setValue);
    };

    const setValue = () => {
        const parsedValue = JSON.stringify(value);
        window.localStorage(key, parsedValue);
    };

    return { getValue, setValue };
}

export default useLocalStorage;
