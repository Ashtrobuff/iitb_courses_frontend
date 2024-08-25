// src/components/CourseList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // State for selected course
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error("There was an error fetching the courses!", error));
  }, []);

  const deleteCourse = (id) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`)
        .then(() => {
          setCourses(courses.filter(course => course.id !== id));
          alert("Course deleted successfully.");
        })
        .catch(error => console.error("There was an error deleting the course!", error));
    }
  };

  const handleViewDetails = async (course) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/courses/${course.id}/`);
      setSelectedCourse(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error("There was an error fetching course details!", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedCourse(null);
  };

  return (
    <div>
      <h2 className='font-bold text-red-950'>Courses</h2>
      <table className="table-auto w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Course Title</th>
            <th className="border px-4 py-2">Code</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">{course.course_code}</td>
              <td className="border px-4 py-2">
                <button 
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleViewDetails(course)}
                >
                  View
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Component */}
      {showPopup && selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Course Details</h3>
            <p><strong>Title:</strong> {selectedCourse.title}</p>
            <p><strong>Description:</strong> {selectedCourse.description}</p>
          
            {/* Add more course details here */}
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
