import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import { FaBook, FaPlus, FaEdit, FaRegFileAlt } from 'react-icons/fa'; // Importing icons
import './courselist.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [addCourseError, setAddCourseError] = useState(""); // Error state for Add Course
  const [updateCourseError, setUpdateCourseError] = useState(""); // Error state for Update Course
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // State to handle course edit
  const [editingCourseName, setEditingCourseName] = useState(""); // State for editing course name
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourseName.trim()) {
      setAddCourseError("Course name is required!");
      setIsSubmitted(true);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/courses/addcourse", {
        name: newCourseName,
      });

      setNewCourseName("");
      setAddCourseError(""); // Clear error on successful add
      setIsSubmitted(false); // Hide any error messages
      fetchCourses(); // Refresh course list

      // Use an alert for success
      alert("Course added successfully!");

    } catch (error) {
      setIsSubmitted(true); // Trigger message display
      if (error.response?.data?.message) {
        setAddCourseError(error.response.data.message);
        alert(error.response.data.message); // Show backend error in alert
      } else {
        setAddCourseError("Something went wrong while adding the course. Please try again.");
        alert("Something went wrong while adding the course. Please try again."); // Generic error alert
      }
    }
  };

  const handleUpdateCourse = async (courseId) => {
    if (!editingCourseName.trim()) {
      setUpdateCourseError("Course name is required for update!");
      setIsSubmitted(true);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/courses/updatecourse/${courseId}`, {
        name: editingCourseName,
      });

      const backendMessage = response.data.message || "Course updated successfully!";
      setUpdateCourseError(""); // Clear update error on success
      setIsSubmitted(true); // Trigger the message display
      setEditingCourse(null); // Reset editing state
      setEditingCourseName(""); // Reset the input
      fetchCourses(); // Refresh the courses list

      // Show success message in alert
      alert(backendMessage); // Success alert

    } catch (error) {
      setIsSubmitted(true); // Trigger message display
      if (error.response?.data?.message) {
        setUpdateCourseError(error.response.data.message);
        alert(error.response.data.message); // Show backend error in alert
      } else {
        setUpdateCourseError("Something went wrong while updating the course. Please try again.");
        alert("Something went wrong while updating the course. Please try again."); // Generic error alert
      }
    }
  };

  return (
    <div className="course-page">
      <Sidebar />
      <div className="centered-content">
        <div className="main-container">
          <h2>📚 Course Management</h2>

          {/* Course List */}
          <div className="course-list">
            {courses.map((course) => (
              <div className="course-box" key={course.id}>
                {editingCourse === course.id ? (
                  <div className="edit-course">
                    <input
                      type="text"
                      value={editingCourseName}
                      onChange={(e) => setEditingCourseName(e.target.value)}
                    />
                    <button onClick={() => handleUpdateCourse(course.id)}>
                      <FaEdit /> Update
                    </button>
                    <button onClick={() => setEditingCourse(null)}>
                      ❌ Cancel
                    </button>
                    {updateCourseError && <p className="message">{updateCourseError}</p>}
                  </div>
                ) : (
                  <>
                    <h3><FaBook /> {course.name}</h3>
                    <div className="button-group">
                      <button onClick={() => navigate(`/courses/${course.name}/topics`)}>
                        <FaRegFileAlt /> View Topics
                      </button>
                      <button onClick={() => navigate(`/courses/${course.name}/questions`)}>
                        <FaRegFileAlt /> View Questions
                      </button>
                      <button onClick={() => {
                        setEditingCourse(course.id);
                        setEditingCourseName(course.name);
                        setUpdateCourseError(""); // Clear update error when starting to edit
                      }}>
                        <FaEdit /> Edit Course
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Add New Course */}
          <form className="add-course-form" onSubmit={handleAddCourse}>
            <h3><FaBook /> ➕ Add New Course</h3>
            {isSubmitted && addCourseError && <p className="message">{addCourseError}</p>}
            <input
              type="text"
              placeholder="Course Name"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
            />
            <button type="submit">
              <FaPlus /> Add Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
