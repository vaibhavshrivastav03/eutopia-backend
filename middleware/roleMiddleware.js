const roleMiddleware = (...allowedRoles) => {

  return (req, res, next) => {

    try {

      const userRole = req.user.role

      if (
        !allowedRoles.includes(userRole)
      ) {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        })
      }

      next()

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

}

module.exports = roleMiddleware