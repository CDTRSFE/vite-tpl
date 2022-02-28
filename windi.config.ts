import { defineConfig } from 'windicss/helpers';
// import aspectRatio from 'windicss/plugin/aspect-ratio';

export default defineConfig({
    attributify: true,
    plugins: [
        require('windicss/plugin/line-clamp'),
        // require('windicss/plugin/forms'),
        // require('windicss/plugin/typography'),
    ],
});
