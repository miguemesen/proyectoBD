const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { id, id_orden, id_vehiculo, id_repuesto, subtotal, total } = req.body
  try {
    await db.callProcedure(
      `BEGIN CrearFactura(:id, :id_orden, :id_vehiculo, :id_repuesto, :subtotal, :total); END;`,
      { id, id_orden, id_vehiculo, id_repuesto, subtotal, total }
    )
    res.status(201).send('Factura creada')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', async (req, res) => {
  const { id, total } = req.body
  try {
    await db.callProcedure(
      `BEGIN ActualizarFactura(:id, :total); END;`,
      { id, total }
    )
    res.send('Factura actualizada')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await db.runQuery(
      'SELECT * FROM Facturacion WHERE Id_Factura = :id',
      { id: parseInt(req.params.id) }
    )
    if (result.rows.length === 0) {
      res.status(404).send('Factura no encontrada')
    } else {
      res.json(result.rows[0])
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await db.runQuery('SELECT * FROM Facturacion')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.callProcedure(
      `BEGIN EliminarFactura(:id); END;`,
      { id: parseInt(req.params.id) }
    )
    res.send('Factura eliminada')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
