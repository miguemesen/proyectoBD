const express = require('express')
const app = express()

app.use(express.json())

require('./swagger')(app)

app.use('/clientes', require('./routes/clientes'))
app.use('/vehiculos', require('./routes/vehiculos'))
app.use('/servicios', require('./routes/servicios'))
app.use('/mecanicos', require('./routes/mecanicos'))
app.use('/ordenes', require('./routes/ordenes'))
app.use('/facturacion', require('./routes/facturacion'))
app.use('/repuestos', require('./routes/repuestos'))
app.use('/proveedores', require('./routes/proveedores'))

app.listen(3000, () => {
  console.log('API running at http://localhost:3000')
  console.log('Docs at http://localhost:3000/api-docs')
})
