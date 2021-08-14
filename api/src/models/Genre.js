const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('genre', {
    id: {
      type: DataTypes.TEXT, 
      allowNull:false,
      primaryKey:true   
    },  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};