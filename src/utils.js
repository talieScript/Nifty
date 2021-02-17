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

export const kebabToCamel = (str) => {
    let arr = str.split('-');
    let capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase());
    let capitalString = capital.join("");

    return capitalString;
  }