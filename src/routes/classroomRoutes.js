const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authUtils');
const { getAllClassrooms, createClassroom, getClassroomById } = require('../controllers/classroomController');

// Get all classrooms
router.get('/', verifyToken, getAllClassrooms);

// Create a classroom (requires authentication)
router.post('/', verifyToken, createClassroom);

// Get classroom by ID
router.get('/:classroomId',  getClassroomById);


module.exports = router;


