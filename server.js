require('dotenv').config()

const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const emergencyContactRoutes = require('./routes/emergencyContactRoutes')
const braceletRoutes = require('./routes/braceletRoutes')
const fireRoutes = require('./routes/fireRoutes')
const ambulanceRoutes = require('./routes/ambulanceRoutes')
const voiceRoutes = require('./routes/voiceRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const hospitalRoutes = require('./routes/hospitalRoutes')


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/emergency-contacts', emergencyContactRoutes)
app.use('/api/bracelets', braceletRoutes)
app.use('/api/fire', fireRoutes)
app.use('/api/ambulance', ambulanceRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/voice', voiceRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/hospital', hospitalRoutes)

app.get('/', (req, res) => {
  res.send('EUTOPIA Backend Running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})