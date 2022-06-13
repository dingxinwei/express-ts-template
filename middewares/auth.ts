
function auth(req, res, next) {
  if (req.session.username) {
    next()
  } else {
    res.json({
      code: 403,
      msg: '请先登录后再访问'
    })
  }
}

export {
  auth
}