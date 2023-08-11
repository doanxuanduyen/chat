export const checkUser = (req, res, next) => {
  try {
    const { email } = req.body;
  }
  catch (err) {
    next(err)
  }
}