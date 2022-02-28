const {pool} = require('../config/connection');


pool.on('connect',()=>{
    console.log('berhasil koneksi ke DB');
});

const createListMeterTable = ()=>{
    const listMeterCreateQuery = 'CREATE TABLE IF NOT EXISTS tb_list_meter (ip_address VARCHAR(100) NOT NULL PRIMARY KEY,nama VARCHAR(100) NOT NULL,mac VARCHAR(100) NOT NULL,jenis VARCHAR(100) NOT NULL,lokasi VARCHAR(100),created_at TIMESTAMP,updated_at TIMESTAMP)';

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
    const listMeterDropQuery = 'DROP TABLE IF EXISTS tb_list_meter';
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
    const logTempCreateQuery = 'CREATE TABLE IF NOT EXISTS tb_log_temp (id UUID PRIMARY KEY,ip_address VARCHAR(100) NOT NULL,temperature DECIMAL(18,2) NOT NULL, created_at TIMESTAMP,updated_at TIMESTAMP)';

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

const dropLogTempTable = () =>{
    const logTempDropQuery = 'DROP TABLE IF EXISTS tb_log_temp';
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

const createAllTable = () => {
    createListMeterTable();
    createLogTempTable();
};

const dropAllTable = ()=>{
    dropListMeterTable();
    dropLogTempTable();
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