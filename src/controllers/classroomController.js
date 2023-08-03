// controllers/classroomController.js

const Classroom = require('../models/Classroom');

// Get all classrooms created by the logged-in mentor
const getAllClassrooms = async (req, res) => {
    try {
        const isUserAdmin = req.user.role === 'admin'; 

        if (isUserAdmin) {
            // Fetch all classrooms without filtering for admin users
            const classrooms = await Classroom.find();
            res.json(classrooms);
        } else {
            // Fetch classrooms created by the logged-in mentor
            const mentorId = req.user._id;
            const classrooms = await Classroom.find({ mentor: mentorId });
            res.json(classrooms);
        }
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
