// src/App.js
import React, { useState } from 'react';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import CourseDetail from './components/CourseDetail';
import AddCourseInstance from './components/AddCourseInstance';
import CourseInstanceList from './components/CourseInstanceList';
const App = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const refreshCourses = () => {
    setSelectedCourse(null);
  };

  return (
    <div>
      <h3 className='font-bold text-3xl text-center mt-5'> Course management console</h3>
      <div className='flex flex-row w-full justify-evenly'>
      <CourseForm selectedCourse={selectedCourse} refreshCourses={refreshCourses} />
      <AddCourseInstance/>    
      </div>
   <div className='flex flex-row gap-10 mt-10 w-full justify-evenly'>
   <CourseList selectCourse={setSelectedCourse} />
<CourseInstanceList/>
   </div>
    </div>
  );
};

export default App;
