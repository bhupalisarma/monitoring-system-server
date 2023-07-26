// controllers/classroomController.js

const Classroom = require('../models/Classroom');

// Get all classrooms created by the logged-in mentor
const getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.json(classrooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch classrooms' });
    }
};


// Create a classroom
const createClassroom = async (req, res) => {
    try {
        const { subject, standard } = req.body;

        // Create a new classroom
        const classroom = new Classroom({
            subject,
            standard,
            mentor : req.user._id
        });

        // Save the classroom to the database
        const savedClassroom = await classroom.save();

        res.json(savedClassroom);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create classroom' });
    }
};

// Create a post in a classroom
const createPost = async (req, res) => {
    try {
        const { heading, content, files } = req.body;
        const { classroomId } = req.params;

        // Find the classroom by ID
        const classroom = await Classroom.findById(classroomId);

        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }

        // Create a new post
        const newPost = {
            heading,
            content,
            files,
            createdAt: new Date(),
            comments: [],
        };

        // Add the new post to the classroom
        classroom.posts.push(newPost);

        // Save the updated classroom to the database
        const updatedClassroom = await classroom.save();

        res.json(updatedClassroom);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};

module.exports = {
    getAllClassrooms,
    createClassroom,
    createPost
};
