const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { id, nombre, apellido, especialidad, telefono } = req.body
  try {
    await db.callProcedure(
      `BEGIN CrearMecanico(:id, :nombre, :apellido, :especialidad, :telefono); END;`,
      { id, nombre, apellido, especialidad, telefono }
    )
    res.status(201).send('Mecánico creado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', async (req, res) => {
  const { id, nombre, apellido, especialidad, telefono } = req.body
  try {
    await db.callProcedure(
      `BEGIN ActualizarMecanico(:id, :nombre, :apellido, :especialidad, :telefono); END;`,
      { id, nombre, apellido, especialidad, telefono }
    )
    res.send('Mecánico actualizado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await db.runQuery(
      'SELECT * FROM Mecanico WHERE Id_Mecanico = :id',
      { id: parseInt(req.params.id) }
    )
    if (result.rows.length === 0) {
      res.status(404).send('Mecanico no encontrado')
    } else {
      res.json(result.rows[0])
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await db.runQuery('SELECT * FROM Mecanico')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.callProcedure(
      `BEGIN EliminarMecanico(:id); END;`,
      { id: parseInt(req.params.id) }
    )
    res.send('Mecánico eliminado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
