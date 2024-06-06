const express = require('express')
const router = express.Router()
const {
    getUser,
    loginAdmin,
    updateUser,
    deleteUser,
    editUser,
    searchUser
} = require('../controller/adminController')

const {protect} = require('../middleware/authMiddleware')

router.post('/login', loginAdmin)
router.get('/',protect, getUser)
router.post('/user/search',protect, searchUser)
router.route('/user/:id', protect).delete(deleteUser).put(protect, editUser); // Edit user route



module.exports = router