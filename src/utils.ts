import { IMAGE_URL } from '../src/API.ts';

export const getPicUrl = (picObj) => {
    const path = picObj.Image.url;
    return `${IMAGE_URL}${path}`;
}
