const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { id, id_cliente, marca, modelo, placa } = req.body
  try {
    await db.callProcedure(
      `BEGIN CrearVehiculo(:id, :id_cliente, :marca, :modelo, :placa); END;`,
      { id, id_cliente, marca, modelo, placa }
    )
    res.status(201).send('Vehículo creado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', async (req, res) => {
  const { id, marca, modelo, placa } = req.body
  try {
    await db.callProcedure(
      `BEGIN ActualizarVehiculo(:id, :marca, :modelo, :placa); END;`,
      { id, marca, modelo, placa }
    )
    res.send('Vehículo actualizado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await db.runQuery(
      'SELECT * FROM Vehiculo WHERE Id_Vehiculo = :id',
      { id: parseInt(req.params.id) }
    )
    if (result.rows.length === 0) {
      res.status(404).send('Vehiculo no encontrado')
    } else {
      res.json(result.rows[0])
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await db.runQuery('SELECT * FROM Vehiculo')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    await db.callProcedure(
      `BEGIN EliminarVehiculo(:id); END;`,
      { id: parseInt(req.params.id) }
    )
    res.send('Vehículo eliminado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
