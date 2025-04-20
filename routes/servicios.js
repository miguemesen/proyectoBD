const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { id, nombre_servicio, descripcion, costo } = req.body
  try {
    await db.callProcedure(
      `BEGIN CrearServicio(:id, :nombre_servicio, :descripcion, :costo); END;`,
      { id, nombre_servicio, descripcion, costo }
    )
    res.status(201).send('Servicio creado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', async (req, res) => {
  const { id, nombre_servicio, descripcion, costo } = req.body
  try {
    await db.callProcedure(
      `BEGIN ActualizarServicio(:id, :nombre_servicio, :descripcion, :costo); END;`,
      { id, nombre_servicio, descripcion, costo }
    )
    res.send('Servicio actualizado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await db.runQuery(
      'SELECT * FROM Servicio WHERE Id_Servicio = :id',
      { id: parseInt(req.params.id) }
    )
    if (result.rows.length === 0) {
      res.status(404).send('Servicio no encontrado')
    } else {
      res.json(result.rows[0])
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await db.runQuery('SELECT * FROM Servicio')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.callProcedure(
      `BEGIN EliminarServicio(:id); END;`,
      { id: parseInt(req.params.id) }
    )
    res.send('Servicio eliminado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
