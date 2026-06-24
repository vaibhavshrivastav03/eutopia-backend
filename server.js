require('dotenv').config()

const express = require('express')

const cors = require('cors')

const http = require('http')

const helmet =
  require('helmet')

const rateLimit =
  require('express-rate-limit')

const { Server } =
  require('socket.io')

// ROUTES
const userRoutes =
  require('./routes/userRoutes')

const uploadRoutes =
  require('./routes/uploadRoutes')

const emergencyContactRoutes =
  require(
    './routes/emergencyContactRoutes'
  )

const braceletRoutes =
  require('./routes/braceletRoutes')

const fireRoutes =
  require('./routes/fireRoutes')

const ambulanceRoutes =
  require('./routes/ambulanceRoutes')

const voiceRoutes =
  require('./routes/voiceRoutes')

const authRoutes =
  require('./routes/authRoutes')

const adminRoutes =
  require('./routes/adminRoutes')

const dashboardRoutes =
  require('./routes/dashboardRoutes')

const hospitalRoutes =
  require('./routes/hospitalRoutes')

const medicalRecordRoutes =
  require(
    './routes/medicalRecordRoutes'
  )

const hospitalRecordRoutes =
  require(
    './routes/hospitalRecordRoutes'
  )

const hospitalIdentificationRoutes =
  require(
    './routes/hospitalIdentificationRoutes'
  )

// EXPRESS APP
const app = express()

// HTTP SERVER
const server =
  http.createServer(app)

// SOCKET SERVER
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

// GLOBAL SOCKET ACCESS
app.set('io', io)

// SECURITY MIDDLEWARE
app.use(helmet())

app.use(
  rateLimit({
    windowMs:
      15 * 60 * 1000,
    max: 100
  })
)

// NORMAL MIDDLEWARE
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

// ROUTES
app.use('/api/auth', authRoutes)

app.use('/api/users', userRoutes)

app.use('/api/upload', uploadRoutes)

app.use(
  '/api/emergency-contacts',
  emergencyContactRoutes
)

app.use(
  '/api/bracelets',
  braceletRoutes
)

app.use('/api/fire', fireRoutes)

app.use(
  '/api/ambulance',
  ambulanceRoutes
)

app.use('/api/voice', voiceRoutes)

app.use('/api/admin', adminRoutes)

app.use(
  '/api/dashboard',
  dashboardRoutes
)

app.use(
  '/api/hospital',
  hospitalRoutes
)

app.use(
  '/api/medical-records',
  medicalRecordRoutes
)
app.use(
  '/api/hospital-records',
  hospitalRecordRoutes
)

app.use(
  '/api/hospital-identification',
  hospitalIdentificationRoutes
)
// ROOT
app.get('/', (req, res) => {

  res.send(
    'EUTOPIA Backend Running'
  )

})

// SOCKET CONNECTION
io.on(
  'connection',
  (socket) => {

    console.log(
      'User Connected:',
      socket.id
    )

    socket.on(
      'disconnect',
      () => {

        console.log(
          'User Disconnected:',
          socket.id
        )

      }
    )

  }
)

const PORT =
  process.env.PORT || 5000

// SERVER START
server.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  )

})