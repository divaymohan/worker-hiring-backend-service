const morgan = require('morgan');
const helmet = require('helmet');
const debug = require('debug')('app:main');

module.exports = function(app){
    app.use(morgan('tiny'));
    app.use(helmet());
}
