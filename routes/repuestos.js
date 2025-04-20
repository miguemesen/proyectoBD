const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { id, nombre, descripcion, precio_unidad, cantidad_disponible } = req.body
  try {
    await db.callProcedure(
      `BEGIN CrearRepuesto(:id, :nombre, :descripcion, :precio_unidad, :cantidad_disponible); END;`,
      { id, nombre, descripcion, precio_unidad, cantidad_disponible }
    )
    res.status(201).send('Repuesto creado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', async (req, res) => {
  const { id, precio_unidad, cantidad_disponible } = req.body
  try {
    await db.callProcedure(
      `BEGIN ActualizarRepuesto(:id, :precio_unidad, :cantidad_disponible); END;`,
      { id, precio_unidad, cantidad_disponible }
    )
    res.send('Repuesto actualizado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await db.runQuery(
      'SELECT * FROM Repuestos WHERE Id_Repuesto = :id',
      { id: parseInt(req.params.id) }
    )
    if (result.rows.length === 0) {
      res.status(404).send('Repuesto no encontrado')
    } else {
      res.json(result.rows[0])
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await db.runQuery('SELECT * FROM Repuestos')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.callProcedure(
      `BEGIN EliminarRepuesto(:id); END;`,
      { id: parseInt(req.params.id) }
    )
    res.send('Repuesto eliminado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
