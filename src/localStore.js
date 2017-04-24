/**
 * Created by fm on 2017/4/24.
 */
export function save(key,value) {
    return window.localStorage.setItem(key,JSON.stringify(value));
}
export function load(key) {
    return JSON.parse(window.localStorage.getItem(key));
}