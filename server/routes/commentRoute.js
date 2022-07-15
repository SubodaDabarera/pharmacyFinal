const router = require('express').Router()
const commentControl = require('../controllers/commentControl')


router.get('/comments/:id', commentControl.getComments )
router.delete('/comments/:id' , commentControl.deleteComment)

router.put('/comments/reply/:id', commentControl.DeleteReply)

// getting commentReport data
router.get('/comments/report/:id', commentControl.getCommentReport)

//getting all comments
router.get('/comments/reports/all', commentControl.getAllComments)

module.exports = router