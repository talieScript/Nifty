import { IMAGE_URL } from '../src/API.ts';

export const getPicUrl = (url) => {
    return `${IMAGE_URL}${url}`;
}
