const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { id, nombre, apellido, telefono, correo, direccion } = req.body
  try {
    await db.callProcedure(
      `BEGIN CrearCliente(:id, :nombre, :apellido, :telefono, :correo, :direccion); END;`,
      { id, nombre, apellido, telefono, correo, direccion }
    )
    res.status(201).send('Cliente creado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.callProcedure(
      `BEGIN EliminarCliente(:id); END;`,
      { id: parseInt(req.params.id) }
    )
    res.send('Cliente eliminado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', async (req, res) => {
  const { id, nombre, apellido, telefono, correo, direccion } = req.body
  try {
    await db.callProcedure(
      `BEGIN ActualizarCliente(:id, :nombre, :apellido, :telefono, :correo, :direccion); END;`,
      { id, nombre, apellido, telefono, correo, direccion }
    )
    res.send('Cliente actualizado')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


router.get('/:id', async (req, res) => {
  try {
    const result = await db.runQuery(
      'SELECT * FROM Cliente WHERE Id_Cliente = :id',
      { id: parseInt(req.params.id) }
    )
    if (result.rows.length === 0) {
      res.status(404).send('Cliente no encontrado')
    } else {
      res.json(result.rows[0])
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await db.runQuery('SELECT * FROM Cliente')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
