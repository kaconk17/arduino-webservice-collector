const {pool} = require('../config/connection');


pool.on('connect',()=>{
    console.log('berhasil koneksi ke DB');
});

const createListMeterTable = ()=>{
    const listMeterCreateQuery = 'CREATE TABLE IF NOT EXISTS tb_list_device(id_device VARCHAR(50) NOT NULL PRIMARY KEY,address VARCHAR(100) UNIQUE NOT NULL,nama VARCHAR(100) NOT NULL,jenis VARCHAR(100) NOT NULL,setatus VARCHAR(10) NOT NULL,lokasi VARCHAR(100),keterangan VARCHAR(100),created_at TIMESTAMP,updated_at TIMESTAMP)';

    pool.query(listMeterCreateQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const dropListMeterTable = () =>{
    const listMeterDropQuery = 'DROP TABLE IF EXISTS tb_list_device';
    pool.query(listMeterDropQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createLogTempTable = ()=>{
    const logTempCreateQuery = 'CREATE TABLE IF NOT EXISTS tb_temperature(time TIMESTAMPTZ NOT NULL,id_device VARCHAR(50) ,nilai DECIMAL(18,2))';

    pool.query(logTempCreateQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createLogPower = ()=>{
    const logPowerCreateQuery = 'CREATE TABLE IF NOT EXISTS tb_logpower(time TIMESTAMPTZ NOT NULL,id_device VARCHAR(50) ,volt DECIMAL(18,2), ampere DECIMAL(18,2), watt DECIMAL(18,2), kwh DECIMAL(18,2), freq DECIMAL(18,2))';

    pool.query(logPowerCreateQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const dropLogTempTable = () =>{
    const logTempDropQuery = 'DROP TABLE IF EXISTS tb_temperature';
    pool.query(logTempDropQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const dropLogPowerTable = () =>{
    const logTempDropQuery = 'DROP TABLE IF EXISTS tb_logpower';
    pool.query(logPowerDropQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createAllTable = () => {
    createListMeterTable();
    createLogTempTable();
    createLogPower();
};

const dropAllTable = ()=>{
    dropListMeterTable();
    dropLogTempTable();
    dropLogPowerTable();
};

pool.on('remove', ()=>{
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createAllTable,
    dropAllTable,
};

require('make-runnable');