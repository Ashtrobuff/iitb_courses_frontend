// src/components/CourseDetail.js
import React from 'react';

const CourseDetail = ({ course }) => {
  if (!course) return <div>Select a course to view its details</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>Code: {course.course_code}</p>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetail;
