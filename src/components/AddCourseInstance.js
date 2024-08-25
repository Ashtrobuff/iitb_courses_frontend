import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseInstanceList = () => {
  const [courseInstances, setCourseInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [filterYear, setFilterYear] = useState('');
  const [filterSemester, setFilterSemester] = useState('');

  const [courses, setCourses] = useState([]); // State for courses
  const [newInstance, setNewInstance] = useState({
    course: '',
    year: '',
    semester: ''
  });

  // Fetch course instances with filter parameters
  const fetchCourseInstances = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/instances/${filterYear}/${filterSemester}/`
      );
      setCourseInstances(response.data);
    } catch (error) {
      console.error("There was an error fetching the course instances!", error);
    }
  };

  // Fetch courses for the dropdown
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/courses/');
      setCourses(response.data);
    } catch (error) {
      console.error("There was an error fetching the courses!", error);
    }
  };

  useEffect(() => {
    fetchCourseInstances();
  }, [filterYear, filterSemester]);

  useEffect(() => {
    fetchCourses(); // Fetch courses when component mounts
  }, []);

  // Filter instances based on year and semester
  useEffect(() => {
    setFilteredInstances(courseInstances);
  }, [courseInstances]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstance((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddInstance = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/instances/', newInstance);
      setCourseInstances((prev) => [...prev, response.data]);
      setFilteredInstances((prev) => [...prev, response.data]);
      alert("Course instance added successfully.");
      // Reset form
      setNewInstance({
        course: '',
        year: '',
        semester: ''
      });
    } catch (error) {
      console.error("There was an error adding the course instance!", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-10 mt-10 p-10 rounded-md bg-white border-solid border-2 border-gray-300">
        <h3 className='font-bold'>Add New Course Instance</h3>
        <select
          name="course"
          value={newInstance.course}
          onChange={handleInputChange}
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
           className='h-10 p-2 rounded-sm border-sm bg-slate-200'
          type="text"
          name="year"
          placeholder="Enter year"
          value={newInstance.year}
          onChange={handleInputChange}
        />
        <input
           className='h-10 p-2 rounded-sm border-sm bg-slate-200'
          type="text"
          name="semester"
          placeholder="Enter semester"
          value={newInstance.semester}
          onChange={handleInputChange}
        />
        <button onClick={handleAddInstance} className='bg-blue-500 p-5 text-white rounded-md hover:scale-95 hover:bg-blue-800'>Add Instance</button>
      </div>

          
    </div>
  );
};

export default CourseInstanceList;
