// controllers/classroomController.js

const Classroom = require('../models/Classroom');

// Get all classrooms
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

module.exports = {
    getAllClassrooms,
    createClassroom,
};
