import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { resultD } from '../../public/ram-result';
import { resultA } from '../../public/GROUPA';
import { resultB } from '../../public/GROUPB';
import { resultC } from '../../public/GROUPC';
function TalentResult() {
  const [activeGroup, setActiveGroup] = useState('D');
  const [searchMobile, setSearchMobile] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Changed to array
  const [isSearchAttempted, setIsSearchAttempted] = useState(false);
  const [groupData, setGroupData] = useState({
    A: [],
    B: [],
    C: [],
    D: []
  });

  useEffect(() => {
    setGroupData(prev => ({
      ...prev,
      D: resultD.students || [],
      A: resultA.students || [],
      B: resultB.students || [],
      C: resultC.students || [],
    }));
  }, []);

  // Search by mobile number - returns all matching students
  const handleSearch = () => {
    setIsSearchAttempted(true);

    if (!searchMobile.trim()) {
      setSearchResults([]);
      return;
    }

    const currentData = groupData[activeGroup];
    // Find ALL students with matching mobile number
    const found = currentData.filter(student => student.mobile_number === searchMobile.trim());
    setSearchResults(found);
  };

  // Clear search
  const clearSearch = () => {
    setSearchMobile('');
    setSearchResults([]);
    setIsSearchAttempted(false);
  };

  // Handle input change
  const handleMobileChange = (e) => {
    setSearchMobile(e.target.value);
    // Reset search results when user starts typing
    if (searchResults.length > 0 || isSearchAttempted) {
      setSearchResults([]);
      setIsSearchAttempted(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const groups = [
    { key: 'A', label: 'Group A', color: 'bg-blue-600' },
    { key: 'B', label: 'Group B', color: 'bg-green-600' },
    { key: 'C', label: 'Group C', color: 'bg-yellow-600' },
    { key: 'D', label: 'Group D', color: 'bg-purple-600' }
  ];

  const currentData = groupData[activeGroup];

  return (
    <>
      <Navbar />
      <div className='mt-20 w-full px-4 md:px-8 lg:px-12'>
        {/* Header */}
        <div className='text-center mb-6'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>TALENTINE EXAM 2026 RESULT</h1>
          <p className='text-gray-600 mt-2'>Select Group to View Results</p>
        </div>

        {/* Tabs */}
        <div className='flex flex-wrap justify-center gap-2 mb-6'>
          {groups.map(group => (
            <button
              key={group.key}
              onClick={() => {
                setActiveGroup(group.key);
                clearSearch();
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${activeGroup === group.key
                  ? `${group.color} text-white shadow-lg scale-105`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {group.label}
            </button>
          ))}
        </div>


        {/* Search Box */}
        <div className='max-w-md mx-auto mb-8 bg-white p-4 rounded-lg '>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            🔍 Search by Mobile Number
          </label>
          <div className='flex gap-2'>
            <input
              type='tel'
              value={searchMobile}
              onChange={handleMobileChange}
              onKeyPress={handleKeyPress}
              placeholder='Enter 10 digit mobile number'
              className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              maxLength={10}
            />
            <button
              onClick={handleSearch}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
            >
              Search
            </button>
            {searchResults.length > 0 && (
              <button
                onClick={clearSearch}
                className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition'
              >
                Clear
              </button>
            )}
          </div>

          {/* Search Results - Multiple students */}
          {isSearchAttempted && searchResults.length > 0 && (
            <div className='mt-4 p-3 bg-green-100 border border-green-400 rounded-lg'>
              <h3 className='font-bold text-green-800 mb-2'>
                ✅ {searchResults.length} Student{searchResults.length > 1 ? 's' : ''} Found
              </h3>
              <div className='space-y-3'>
                {searchResults.map((student, idx) => (
                  <div key={idx} className='border-t border-green-300 pt-2 first:border-t-0 first:pt-0'>
                    <p><strong>Name:</strong> {student.student_name}</p>
                    <p><strong>Father's Name:</strong> {student.father_name}</p>
                    <p><strong>Mobile:</strong> {student.mobile_number}</p>
                    <p><strong>Marks:</strong> {student.marks}</p>
                    <p><strong>Rank:</strong> {student.rank || 'Not Assigned'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Not Found Message */}
          {isSearchAttempted && searchResults.length === 0 && searchMobile && (
            <div className='mt-4 p-3 bg-red-100 border border-red-400 rounded-lg'>
              <p className='text-red-700'>❌ No student found with mobile number "{searchMobile}" in {activeGroup}</p>
            </div>
          )}
        </div>



        {/* Result Table */}
        {/* <div className='w-full overflow-x-auto bg-white rounded-lg shadow-lg'>
          <div className='min-w-full'>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr className={`${groups.find(g => g.key === activeGroup)?.color} text-white`}>
                  <th className='px-4 py-3 text-left border'>SR. NO</th>
                  <th className='px-4 py-3 text-left border'>STUDENT'S NAME</th>
                  <th className='px-4 py-3 text-left border'>FATHER'S NAME</th>
                  <th className='px-4 py-3 text-left border'>MOBILE NUMBER</th>
                  <th className='px-4 py-3 text-center border'>MARKS</th>
                  <th className='px-4 py-3 text-center border'>RANK</th>
                </tr>
              </thead>
              <tbody>
                {currentData && currentData.length > 0 ? (
                  currentData.map((student, index) => (
                    <tr 
                      key={student.sr_no || index} 
                      className='hover:bg-gray-50 transition border-b'
                    >
                      <td className='px-4 py-2 border'>{student.sr_no || index + 1}</td>
                      <td className='px-4 py-2 border font-medium'>{student.student_name}</td>
                      <td className='px-4 py-2 border'>{student.father_name}</td>
                      <td className='px-4 py-2 border'>{student.mobile_number || 'N/A'}</td>
                      <td className='px-4 py-2 border text-center'>
                        <span className={`px-2 py-1 rounded ${
                          student.marks >= 60 ? 'bg-green-100 text-green-800' :
                          student.marks >= 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.marks}
                        </span>
                      </td>
                      <td className='px-4 py-2 border text-center'>
                        {student.rank || (
                          <span className='text-gray-400'>-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className='text-center py-8 text-gray-500'>
                      No data available for {activeGroup}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div> */}

        {/* Statistics */}
        {/* {currentData && currentData.length > 0 && (
          <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='bg-blue-100 p-4 rounded-lg text-center'>
              <p className='text-2xl font-bold text-blue-800'>{currentData.length}</p>
              <p className='text-gray-600'>Total Students</p>
            </div>
            <div className='bg-green-100 p-4 rounded-lg text-center'>
              <p className='text-2xl font-bold text-green-800'>
                {Math.max(...currentData.map(s => s.marks), 0)}
              </p>
              <p className='text-gray-600'>Highest Marks</p>
            </div>
            <div className='bg-yellow-100 p-4 rounded-lg text-center'>
              <p className='text-2xl font-bold text-yellow-800'>
                {(currentData.reduce((sum, s) => sum + s.marks, 0) / currentData.length).toFixed(1)}
              </p>
              <p className='text-gray-600'>Average Marks</p>
            </div>
            <div className='bg-purple-100 p-4 rounded-lg text-center'>
              <p className='text-2xl font-bold text-purple-800'>
                {currentData.filter(s => s.marks >= 50).length}
              </p>
              <p className='text-gray-600'>Passed (≥50)</p>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

export default TalentResult;