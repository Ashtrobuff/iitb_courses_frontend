// src/components/CourseForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseForm = ({ selectedCourse, refreshCourses }) => {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title);
      setCourseCode(selectedCourse.course_code);
      setDescription(selectedCourse.description);
    }
  }, [selectedCourse]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = { title, course_code: courseCode, description };

    if (selectedCourse) {
      axios.put(`http://127.0.0.1:8000/api/courses/${selectedCourse.id}/`, courseData)
        .then(refreshCourses)
        .catch(error => console.error("There was an error updating the course!", error));
    } else {
      axios.post('http://127.0.0.1:8000/api/courses/', courseData)
        .then(refreshCourses)
        .catch(error => console.error("There was an error creating the course!", error));
    }

    setTitle('');
    setCourseCode('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-10 mt-10 p-10 rounded-md bg-white border-solid border-2 border-gray-300'>
      <h2 className='font-bold'>{selectedCourse ? 'Update Course' : 'Create Course'}</h2>
      <input 
      className='h-10 p-2 rounded-sm border-sm bg-slate-200'
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
         className='h-10 p-2 rounded-sm border-sm bg-slate-200'
        type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />
      <textarea
        className='h-10 p-2 rounded-sm border-sm bg-slate-200'
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className='bg-blue-500 p-5 text-white rounded-md hover:scale-95 hover:bg-blue-800'>{selectedCourse ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default CourseForm;
