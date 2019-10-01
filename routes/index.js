const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

// router.get('/', controllers.getHomePage)
router.get('/', (req, res) => {
    res.send({ working: yes })
})
router.get('/clients', controllers.getClientsPage)
router.get('/requests', controllers.getRequestsPage)
router.post('/requests', controllers.postRequests)
router.post('/users/delete', controllers.deleteUser)
router.post('/requests/delete', controllers.deleteRequest)
module.exports = router