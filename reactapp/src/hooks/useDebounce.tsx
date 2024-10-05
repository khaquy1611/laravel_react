/* eslint-disable @typescript-eslint/no-explicit-any */
const useDebounce = () => {
    const debounce = (func: any, timeout = 300) => {
        let timer: any;
            return (...args: any) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func(...args);
                }, timeout);
            };
        }
    return { debounce }
}
export default useDebounce