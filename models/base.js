const { Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize(
    'shortener_url',
    'root',
    'root',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    },
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = {
    sequelize: sequelize,
    Op: Op
}