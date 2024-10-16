// import React, { useState } from 'react';

// const SortAndFiltersBar = ({
//   isSortBarOpen,
//   toggleSortBar,
//   onSortChange,
//   isFiltersBarOpen,
//   toggleFiltersBar,
//   filterOptions,
//   onFilterChange,
// }) => {
//   const [activeDropdowns, setActiveDropdowns] = useState({});
//   const [date, setDate] = useState(filterOptions.date || '');
//   const [time, setTime] = useState(filterOptions.time || '');

//   const handleDropdownToggle = (dropdown) => {
//     setActiveDropdowns((prev) => ({
//       ...prev,
//       [dropdown]: !prev[dropdown],
//     }));
//   };

//   const handleSortChange = (sortType) => {
//     onSortChange(sortType);
//     toggleSortBar(); // Close sort bar after sorting
//   };

//   const handleFilterApply = () => {
//     onFilterChange({ date, time });
//     toggleFiltersBar(); // Close filter bar after applying
//   };

//   return (
//     <>
//       {isSortBarOpen && <div className="overlay" onClick={toggleSortBar}></div>}
//       <div className={`sort-bar ${isSortBarOpen ? 'open' : ''} w-80 h-full`}>
//         <h2 style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Sort Options</h2>
//         <div className="sort-options">
//           <div className="sort-option">
//             <button className="sort-btn" style={{ display: 'flex' }} onClick={() => handleDropdownToggle('ph')}>
//               <h1 style={{ fontWeight: 'bold', fontSize: '25px' }}>pH Level</h1>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="chevron-icon" fill="black">
//                 <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
//               </svg>
//             </button>
//             {activeDropdowns['ph'] && (
//               <ul className="dropdown">
//                 <li onClick={() => handleSortChange('phLow')} className='options'>From Lowest to Highest</li>
//                 <li onClick={() => handleSortChange('phHigh')} className='options'>From Highest to Lowest</li>
//               </ul>
//             )}
//           </div>
//           <hr />
//           <div className="sort-option">
//             <button className="sort-btn" style={{ display: 'flex' }} onClick={() => handleDropdownToggle('turbidity')}>
//               <h1 style={{ fontWeight: 'bold', fontSize: '25px' }}>Turbidity</h1>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="chevron-icon" fill="black">
//                 <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
//               </svg>
//             </button>
//             {activeDropdowns['turbidity'] && (
//               <ul className="dropdown">
//                 <li onClick={() => handleSortChange('turbidityLow')} className='options'>From Lowest to Highest</li>
//                 <li onClick={() => handleSortChange('turbidityHigh')} className='options'>From Highest to Lowest</li>
//               </ul>
//             )}
//           </div>
//           <hr />
//           <div className="sort-option">
//             <button className="sort-btn" style={{ display: 'flex' }} onClick={() => handleDropdownToggle('temp')}>
//               <h1 style={{ fontWeight: 'bold', fontSize: '25px' }}>Temperature</h1>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="chevron-icon" fill="black">
//                 <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
//               </svg>
//             </button>
//             {activeDropdowns['temp'] && (
//               <ul className="dropdown">
//                 <li onClick={() => handleSortChange('tempLow')} className='options'>From Lowest to Highest</li>
//                 <li onClick={() => handleSortChange('tempHigh')} className='options' >From Highest to Lowest</li>
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       {isFiltersBarOpen && <div className="overlay" onClick={toggleFiltersBar}></div>}
//       <div className={`filters-bar ${isFiltersBarOpen ? 'open' : ''} w-80 h-full`}>
//         <h2 style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Filter Options</h2>
//         <div className="filters">
//           <div className="filter">
//             <h3 style={{ fontWeight: 'bold' }}>Filter by Date</h3>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="date-input"
//             />
//           </div>
//           <hr />
//           <div className="filter">
//             <h3 style={{ fontWeight: 'bold' }}>Filter by Time</h3>
//             <input
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="time-input"
//             />
//           </div>
//           <button onClick={handleFilterApply} className="apply-filters-btn" style={{ backgroundColor: '#46a2f5', width: '260px', height: '40px', fontWeight: 'bold', borderRadius: '8px', fontSize: '15px' }}>Apply Filters</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SortAndFiltersBar;

import React, { useState } from "react";

const SortAndFiltersBar = ({
  isSortBarOpen,
  toggleSortBar,
  onSortChange,
  isFiltersBarOpen,
  toggleFiltersBar,
  filterOptions,
  onFilterChange,
  fetchedData = [], // Provide a default empty array for fetchedData
}) => {
  const [activeDropdowns, setActiveDropdowns] = useState({});
  const [date, setDate] = useState(filterOptions.date || "");
  const [time, setTime] = useState(filterOptions.time || "");

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleSortChange = (sortType) => {
    onSortChange(sortType);
    toggleSortBar(); // Close sort bar after sorting
  };

  const handleFilterApply = () => {
    const formattedDateTime = date && time ? `${date} ${time}` : "";

    // Log fetched data to verify the format of date_time
    console.log("Fetched data:", fetchedData);

    // Ensure fetchedData exists and is an array before filtering
    if (Array.isArray(fetchedData)) {
      const filteredRecords = fetchedData.filter((record) => {
        const recordDateTime = new Date(record.date_time); // Convert to Date object
        const recordDate = recordDateTime.toISOString().split("T")[0]; // Extract the date part
        const recordTime = recordDateTime
          .toTimeString()
          .split(" ")[0]
          .slice(0, 5); // Extract the time part in HH:MM

        // Log the date and time for each record for debugging
        console.log("Record date:", recordDate);
        console.log("Record time:", recordTime);

        // Match based on both date and time if both are provided
        if (formattedDateTime) {
          return recordDate === date && recordTime === time;
        } else if (date) {
          return recordDate === date; // Match by date only if no time is provided
        }
        return true; // Return all records if no filter is applied
      });

      console.log("Filtered Records:", filteredRecords); // Log the filtered records

      // Pass the filtered records back to the parent component
      onFilterChange({ date, time: formattedDateTime, filteredRecords });
    }

    toggleFiltersBar(); // Close filter bar after applying
  };

  return (
    <>
      {isSortBarOpen && <div className="overlay" onClick={toggleSortBar}></div>}
      <div className={`sort-bar ${isSortBarOpen ? "open" : ""} w-80 h-full`}>
        <h2
          style={{ fontWeight: "bold", textAlign: "center", marginTop: "20px" }}
        >
          Sort Options
        </h2>
        <div className="sort-options">
          <div className="sort-option">
            <button
              className="sort-btn"
              style={{ display: "flex" }}
              onClick={() => handleDropdownToggle("ph")}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "25px" }}>pH Level</h1>
            </button>
            {activeDropdowns["ph"] && (
              <ul className="dropdown">
                <li
                  onClick={() => handleSortChange("phLow")}
                  className="options"
                >
                  From Lowest to Highest
                </li>
                <li
                  onClick={() => handleSortChange("phHigh")}
                  className="options"
                >
                  From Highest to Lowest
                </li>
              </ul>
            )}
          </div>
          <hr />
          {/* Additional sort options for turbidity and temperature */}
        </div>
      </div>

      {isFiltersBarOpen && (
        <div className="overlay" onClick={toggleFiltersBar}></div>
      )}
      <div
        className={`filters-bar ${isFiltersBarOpen ? "open" : ""} w-80 h-full`}
      >
        <h2
          style={{ fontWeight: "bold", textAlign: "center", marginTop: "20px" }}
        >
          Filter Options
        </h2>
        <div className="filters">
          <div className="filter">
            <h3 style={{ fontWeight: "bold" }}>Filter by Date</h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="date-input"
            />
          </div>
          <hr />
          <div className="filter">
            <h3 style={{ fontWeight: "bold" }}>Filter by Time</h3>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="time-input"
            />
          </div>
          <button
            onClick={handleFilterApply}
            className="apply-filters-btn"
            style={{
              backgroundColor: "#46a2f5",
              width: "260px",
              height: "40px",
              fontWeight: "bold",
              borderRadius: "8px",
              fontSize: "15px",
              marginTop: "20px",
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default SortAndFiltersBar;
