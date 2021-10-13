const router = require('express').Router()
const staffControl = require('../controllers/adminSignInControler')

//get all users
router.get('/admins', staffControl.getUsers)

router.post('/admin/signIn', staffControl.adminSignIn)

module.exports = router