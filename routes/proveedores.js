const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { id, id_repuesto, empresa, correo, telefono } = req.body
  try {
    await db.callProcedure(
      `BEGIN CrearProveedor(:id, :id_repuesto, :empresa, :correo, :telefono); END;`,
      { id, id_repuesto, empresa, correo, telefono }
    )
    res.status(201).send('Proveedor creado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', async (req, res) => {
  const { id, correo, telefono } = req.body
  try {
    await db.callProcedure(
      `BEGIN ActualizarProveedor(:id, :correo, :telefono); END;`,
      { id, correo, telefono }
    )
    res.send('Proveedor actualizado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await db.runQuery(
      'SELECT * FROM Proveedores WHERE Id_Proveedor = :id',
      { id: parseInt(req.params.id) }
    )
    if (result.rows.length === 0) {
      res.status(404).send('Proveedor no encontrado')
    } else {
      res.json(result.rows[0])
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await db.runQuery('SELECT * FROM Proveedores')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.callProcedure(
      `BEGIN EliminarProveedor(:id); END;`,
      { id: parseInt(req.params.id) }
    )
    res.send('Proveedor eliminado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router