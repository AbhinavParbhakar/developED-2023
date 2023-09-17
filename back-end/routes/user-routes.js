const express = require('express');

const { getUserById, createUser, updateUser } = require('../controllers/user-controller');

const router = express.Router();


router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/', updateUser);

module.exports = router;
