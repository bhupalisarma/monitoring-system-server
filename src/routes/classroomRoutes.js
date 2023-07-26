const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authUtils');
const { getAllClassrooms, createClassroom , createPost} = require('../controllers/classroomController');

// Get all classrooms
router.get('/', verifyToken, getAllClassrooms);

// Create a classroom (requires authentication)
router.post('/', verifyToken, createClassroom);

// Create a post in the classroom (requires authentication)
router.post('/:classroomId/posts', verifyToken, createPost);

module.exports = router;


