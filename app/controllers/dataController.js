const moment = require('moment');
const {pool} = require('../config/connection');


const saveTemp = async (devid,data) => {
    const saveQuery = 'INSERT INTO tb_temperature VALUES($1,$2,$3)';
    
    const now = moment().format();

    const values = [
      now,
      devid,
      data
    ];
    var device = await checkDev(devid);
    if (device > 0) {
      
      try {
        const {rows} =  pool.query(saveQuery, values);
        return true;
      } catch (error) {
        console.error("gagal insert", error);
        return false;
      }
    }else{
      return false;
    }
};

const savePower = async (devid,data) => {
  const saveQuery = 'INSERT INTO tb_logpower VALUES($1,$2,$3,$4,$5,$6,$7)';
  
  const now = moment().format();

  const values = [
    now,
    devid,
    data.volt,
    data.ampere,
    data.watt,
    data.kwh,
    data.freq
  ];
  var device = await checkDev(devid);
  if (device > 0) {
    
    try {
      const {rows} =  pool.query(saveQuery, values);
      return true;
    } catch (error) {
      console.error("gagal insert", error);
      return false;
    }
  }else{
    return false;
  }
};

const checkDev = async (devid) => {
  const checkQuery = "SELECT id_device FROM tb_list_device WHERE id_device = $1";
 
    const {rows} = await pool.query(checkQuery,[devid]);
    
    const dbResponds = rows.length;
    return dbResponds;

};

const devUpd = (devid, state) => {
  const updQuery = 'UPDATE tb_list_device SET setatus = $1, updated_at = $2 WHERE id_device = $3';
  const now = moment().format();
  const values = [
    state,
    now,
    devid
  ];

  try {
    pool.query(updQuery,values);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  saveTemp,
  savePower,
  devUpd,
  checkDev,
};