import sanity from '../client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanity);

export const CreateURL = (src, width = 300, height = 300) =>
  builder
    .image(src) //
    .width(width)
    .height(height)
    .url();

export const FormatDate = (date) => new Date(date).toLocaleDateString();

export const TextToHtml = (text) => text.replace(/\n/g, '<br />');
