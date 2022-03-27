const moment = require('moment');
const {pool} = require('../config/connection');
const { v4:uuidv4} = require('uuid');

const saveTemp = (devid,data,ket) => {
    const saveQuery = 'INSERT INTO tb_temperature VALUES($1,$2,$3,$4,$5,$6,$7)';
    const id = uuidv4();
    const now = moment().format();
    const tgl = moment().format('YYYY-MM-DD');
    const jam = moment().format('HH:mm:ss');

    const values = [
      id,
      devid,
      tgl,
      jam,
      data,
      ket,
      now
    ];
    try {
      const {rows} = pool.query(saveQuery, values);
      return true;
    } catch (error) {
      return false;
    }
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
  devUpd,
};