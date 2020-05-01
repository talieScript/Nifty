import { IMAGE_URL } from '../src/API.ts';

export const getPicUrl = (url) => {
    return `${IMAGE_URL}${url}`;
}

export const toKebabCase = function(string) {
    return string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, '-')
    .toLowerCase();
}