const { sequelize } = require("./base");
const { DataTypes } = require("sequelize");


const Urls = sequelize.define("urls", {
    source: {
        type: DataTypes.TEXT
    },
    short: {
        type: DataTypes.TEXT
    },
    createdAt: {
        type: "TIMESTAMP",
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: false
});

/* Urls.belongsTo(Users, {
    foreignKey: "createdBy"
});
 */
sequelize.sync().then(() => {
    console.log('Urls table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = {
    Urls: Urls,
    // sequelize: sequelize
};