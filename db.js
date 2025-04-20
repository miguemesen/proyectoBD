const oracledb = require('oracledb')

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

const config = {
  user: 'Mil_Parabrisas_SYS',
  password: 'pass123',
  connectString: 'localhost:1521/ORCLPDB'
}

async function callProcedure(sql, binds = {}) {
  let connection
  try {
    connection = await oracledb.getConnection(config)
    await connection.execute(sql, binds)
    await connection.commit()
  } finally {
    if (connection) await connection.close()
  }
}

async function runQuery(sql, binds = {}, options = {}) {
  let connection
  try {
    connection = await oracledb.getConnection(config)
    const result = await connection.execute(sql, binds, options)
    return result
  } finally {
    if (connection) await connection.close()
  }
}

module.exports = { callProcedure, runQuery }
