const express = require("express");
const router = express.Router();


const Student = require("../Models/Student");


// CREATE
router.post("/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json({
            message: "Student created successfully",
            data: student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// READ ALL
router.get("/students", async (req, res) => {
    try {
        const students = await Student.find();

        res.json({
            message: "Students retrieved successfully",
            data: students
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// READ ONE
router.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE
router.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully",
            data: student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE
router.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student deleted successfully"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;