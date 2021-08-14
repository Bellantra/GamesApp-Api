const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('videogame', {
    id: {
      type: DataTypes.TEXT,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type:DataTypes.TEXT,
      
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    released:{
      type:DataTypes.DATE,
    },
    rating: {
      type:DataTypes.REAL,
    },
    platforms: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    
    

  });
};
