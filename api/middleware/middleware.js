const User = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `${req.method} ${req.url} ${new Date().toISOString()}`
  )
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params
  try{
    const user = await User.getById(id)
    if(!user){
      res.status(404).json({ message: "user not found" })
    }else{
      req.user = user
      next()
    }
  }catch(e){
    res.status(500).json(e.message)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const newUser = req.body
  const userName = req.body.name
  if(!userName){
    res.status(400).json({ message: "missing required name field" })
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const text = req.body.text
  if(!text){
    res.status(400).json({ message: "missing required text field" })
  }else{
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