const {pool} = require('../config/connection');


pool.on('connect',()=>{
    console.log('berhasil koneksi ke DB');
});

const createListMeterTable = async ()=>{
    const listMeterCreateQuery = 'CREATE TABLE IF NOT EXISTS tb_list_device(id_device TEXT NOT NULL PRIMARY KEY,address VARCHAR(100) UNIQUE NOT NULL,nama VARCHAR(100) NOT NULL,jenis VARCHAR(100) NOT NULL,setatus VARCHAR(10) NOT NULL,lokasi VARCHAR(100),keterangan VARCHAR(100),created_at TIMESTAMP,updated_at TIMESTAMP)';

    await pool.query(listMeterCreateQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const dropListMeterTable = async () =>{
    const listMeterDropQuery = 'DROP TABLE IF EXISTS tb_list_device';
    await pool.query(listMeterDropQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createLogTempTable = async ()=>{
    const logTempCreateQuery = 'CREATE TABLE IF NOT EXISTS tb_temperature(time TIMESTAMPTZ NOT NULL,id_device TEXT NOT NULL ,nilai DECIMAL(18,2))';

   await pool.query(logTempCreateQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createHyperTable = async (tbName)=>{
    const theQuery = "SELECT create_hypertable($1,'time');"
    await pool.query(theQuery, [tbName])
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createContinuousTemp = async ()=>{
    const theQuery = "CREATE MATERIALIZED VIEW temp_daily WITH (timescaledb.continuous) AS SELECT time_bucket('1 day', \"time\") AS day, id_device, max(nilai) AS high, min(nilai) AS low, avg(nilai) AS average FROM tb_temperature GROUP BY day, id_device;"
    await pool.query(theQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createContinuousPower = async ()=>{
    const theQuery = "CREATE MATERIALIZED VIEW power_daily WITH (timescaledb.continuous) AS SELECT time_bucket('1 day', \"time\") AS day, id_device, max(volt) AS v_high, min(volt) AS v_low, avg(volt) AS v_avg, max(ampere) AS a_high, min(ampere) AS a_low, avg(ampere) AS a_avg, max(watt) AS w_high, min(watt) AS w_low, avg(watt) AS w_avg, min(kwh) as kwh_min, max(kwh) as kwh_max FROM tb_logpower GROUP BY day, id_device;"
    await pool.query(theQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createRefreshTemp = async ()=>{
    const theQuery = "SELECT add_continuous_aggregate_policy('temp_daily', start_offset => INTERVAL '3 days',end_offset => INTERVAL '1 hour', schedule_interval => INTERVAL '1 days');"
    await pool.query(theQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createRefreshPower = async ()=>{
    const theQuery = "SELECT add_continuous_aggregate_policy('power_daily', start_offset => INTERVAL '3 days',end_offset => INTERVAL '1 hour', schedule_interval => INTERVAL '1 days');"
    await pool.query(theQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createRetentionPolicy = async (tbName)=>{
    const theQuery = "SELECT add_retention_policy($1, INTERVAL '6 month');"
    await pool.query(theQuery, [tbName])
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createLogPower = async ()=>{
    const logPowerCreateQuery = 'CREATE TABLE IF NOT EXISTS tb_logpower(time TIMESTAMPTZ NOT NULL,id_device TEXT NOT NULL,volt DECIMAL(18,2), ampere DECIMAL(18,2), watt DECIMAL(18,2), kwh DECIMAL(18,2), freq DECIMAL(18,2), pf DECIMAL(18,2))';

  await pool.query(logPowerCreateQuery)
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
    const logPowerDropQuery = 'DROP TABLE IF EXISTS tb_logpower';
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

const indexTemptable = ()=>{
    const theQuery = "CREATE INDEX tmp_id_time ON tb_temperature (id_device, time DESC);"
    pool.query(theQuery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const indexPowertable = ()=>{
    const theQuery = "CREATE INDEX pow_id_time ON tb_logpower (id_device, time DESC);"
    pool.query(theQuery)
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

const createAllHyper = () =>{
    createHyperTable("tb_temperature");
    createHyperTable("tb_logpower");

    indexTemptable();
    indexPowertable();
};

const createContinuousAggregate = () =>{
    createContinuousTemp();
    createContinuousPower();
};

const createrefreshPolicy = () =>{
    createRefreshTemp();
    createRefreshPower();
};

const createAllretention = ()=>{
    createRetentionPolicy("tb_temperature");
    createRetentionPolicy("tb_logpower");
};

pool.on('remove', ()=>{
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createAllTable,
    dropAllTable,
    createAllHyper,
    createContinuousAggregate,
    createrefreshPolicy,
    createAllretention,
};

require('make-runnable');