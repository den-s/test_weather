let __ENV__ = process.env.NODE_ENV || 'development';

let CONFIG = require(`./api.${__ENV__}.config.js`);

export default CONFIG;
