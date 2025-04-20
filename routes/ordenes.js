const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { id, id_vehiculo, id_servicio, id_mecanico, fecha_ingreso, fecha_salida, estado } = req.body
  try {
    await db.callProcedure(
      `BEGIN CrearOrdenServicio(
        :id,
        :id_vehiculo,
        :id_servicio,
        :id_mecanico,
        TO_DATE(:fecha_ingreso, 'YYYY-MM-DD'),
        TO_DATE(:fecha_salida, 'YYYY-MM-DD'),
        :estado
      ); END;`,
      { id, id_vehiculo, id_servicio, id_mecanico, fecha_ingreso, fecha_salida, estado }
    )
    
    res.status(201).send('Orden de servicio creada')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', async (req, res) => {
  const { id, estado } = req.body
  try {
    await db.callProcedure(
      `BEGIN ActualizarOrdenServicio(:id, :estado); END;`,
      { id, estado }
    )
    res.send('Orden de servicio actualizada')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await db.runQuery(
      'SELECT * FROM Orden_servicio WHERE Id_Orden = :id',
      { id: parseInt(req.params.id) }
    )
    if (result.rows.length === 0) {
      res.status(404).send('Orden no encontrado')
    } else {
      res.json(result.rows[0])
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await db.runQuery('SELECT * FROM Orden_servicio')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.callProcedure(
      `BEGIN EliminarOrdenServicio(:id); END;`,
      { id: parseInt(req.params.id) }
    )
    res.send('Orden de servicio eliminada')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router