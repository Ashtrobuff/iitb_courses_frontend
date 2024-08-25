import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseInstanceList = () => {
  const [courseInstances, setCourseInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [filterYear, setFilterYear] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null); // State for selected course
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const fetchCourseInstances = async (year, semester) => {
    try {
      let url = 'http://127.0.0.1:8000/api/instances/';

      // Only append year and semester if they are not empty
      if (year) {
        url += `${year}/`;
        if (semester) {
          url += `${semester}/`;
        }
      }

      const response = await axios.get(url);
      setCourseInstances(response.data);
    } catch (error) {
      console.error("There was an error fetching the course instances!", error);
    }
  };

  useEffect(() => {
    // Fetch all instances if year and semester filters are empty
    fetchCourseInstances(filterYear, filterSemester);
  }, [filterYear, filterSemester]);

  useEffect(() => {
    setFilteredInstances(courseInstances);
  }, [courseInstances]);

  const handleViewDetails = async (instance) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/courses/${instance.course}/`);
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

  const handleDelete = (instance) => {
    const url = `http://127.0.0.1:8000/api/instances/${instance.year}/${instance.semester}/${instance.id}/`;

    if (window.confirm("Are you sure you want to delete this instance?")) {
      axios.delete(url)
        .then(() => {
          setCourseInstances(prevInstances => prevInstances.filter(inst => inst.id !== instance.id));
          setFilteredInstances(prevInstances => prevInstances.filter(inst => inst.id !== instance.id));
          alert("Instance deleted successfully.");
        })
        .catch(error => console.error("There was an error deleting the instance!", error));
    }
  };

  return (
    <div>
      <h2 className='font-bold'>Course Instances</h2>

      <div className="filters gap-10 mt-2">
        <input
          className='h-10 p-2 rounded-sm border-sm bg-slate-200 mr-5'
          type="text"
          placeholder="Filter by year"
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
        />
        <input
          className='h-10 p-2 rounded-sm border-sm bg-slate-200 mr-5'
          type="text"
          placeholder="Filter by semester"
          value={filterSemester}
          onChange={e => setFilterSemester(e.target.value)}
        />
        <button onClick={() => fetchCourseInstances(filterYear, filterSemester)}>Apply Filters</button>
      </div>

      <table className="table-auto w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Course Title</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Semester</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstances.map((instance, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{instance.course_title}</td>
              <td className="border px-4 py-2">{instance.year}</td>
              <td className="border px-4 py-2">{instance.semester}</td>
              <td className="border px-4 py-2">
                <button 
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleViewDetails(instance)}
                >
                  View Details
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(instance)}
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

export default CourseInstanceList;
