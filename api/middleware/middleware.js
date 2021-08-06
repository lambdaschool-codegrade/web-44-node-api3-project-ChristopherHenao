const User = require("../users/users-model")

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      next({ status: 404, message: "user not found"})
    }
    else {
      req.user = user
      next()
    }
  }
  catch (error) {
    res.status(500).json({message: "error accessing server"})
  }
}


function validateUser(req, res, next) {
  const { name } = req.body
  if (!name || !name.trim()) {
    next({ status: 400, message: "missing required name field" })
  }
  else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  const { text } = req.body
  if (!text || !text.trim()) {
    next({ status: 400, message: "missing required text field" })
  }
  else {
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
validateUserId,
validateUser,
validatePost
}