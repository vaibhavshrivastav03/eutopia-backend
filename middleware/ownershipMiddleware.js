const ownershipMiddleware =
  (req, res, next) => {

    try {

      // ADMIN CAN ACCESS EVERYTHING
      if (
        req.user.role === 'admin'
      ) {

        return next()

      }

      // HOSPITAL CAN ACCESS EVERYTHING
      if (
        req.user.role === 'hospital'
      ) {

        return next()

      }

      const requestedUserId =
        req.params.userId

      if (
        req.user.id !==
        requestedUserId
      ) {

        return res.status(403).json({
          success: false,
          error:
            'Access denied'
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

module.exports =
  ownershipMiddleware