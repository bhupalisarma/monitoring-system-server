const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authUtils');
const { getAllClassrooms, createClassroom } = require('../controllers/classroomController');

// Get all classrooms
router.get('/', getAllClassrooms);

// Create a classroom (requires authentication)
router.post('/', verifyToken, createClassroom);

module.exports = router;


