// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Conttable({ selectedDate, setSelectedDate, recordss }) {
//   // Accept props
//   const [records, setRecords] = useState(recordss);
//   const [filteredRecords, setFilteredRecords] = useState([]);

//   useEffect(() => {
//     const fetchRecords = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/api/controls");

//         if (response.status === 200) {
//           // Successfully fetched records
//           console.log("Fetched Records:", response.data);
//           setRecords(response.data);
//         } else if (response.status === 404) {
//           // No records found
//           console.warn("No control records found.");
//           setRecords([]); // Clear the records if none are found
//         }
//       } catch (error) {
//         console.error("Error fetching records:", error);
//       }
//     };

//     fetchRecords();
//   }, []);

//   useEffect(() => {
//     if (selectedDate) {
//       const filtered = records.filter(
//         (record) => record.daynum === selectedDate.daynum
//       );
//       console.log("Filtered Records:", filtered);
//       setFilteredRecords(filtered);
//     } else {
//       setFilteredRecords([]); // Clear filtered records if no date is selected
//     }
//   }, [selectedDate, records]);

//   const handleDateClick = (daynum) => {
//     // Update selectedDate with both day and daynum
//     const day = new Date(2024, 9, daynum).toLocaleString("default", {
//       weekday: "long",
//     });
//     setSelectedDate({ day, daynum }); // Pass both values
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:3002/records/${id}`)
//       .then((response) => {
//         console.log("Record deleted:", response.data);
//         // Update filtered records after deletion
//         setFilteredRecords(
//           filteredRecords.filter((record) => record.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error deleting record:", error);
//       });
//   };

//   return (
//     <>
//       <h1 style={{ color: "#1f639e" }}>October 2024</h1>
//       <div style={{ display: "flex", position: "relative" }}>
//         {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].map(
//           (day, index) => (
//             <div
//               key={index}
//               className="memberdate"
//               style={{
//                 left: `${index * 55 - 300}px`,
//                 top: `${Math.abs(5 - index) * 10}px`,
//                 backgroundColor:
//                   selectedDate?.daynum === day ? "#46a2f5" : "white",
//                 color: selectedDate?.daynum === day ? "white" : "black",
//                 padding: "7px",
//                 border: "1px solid #46a2f5",
//                 borderRadius: "5px",
//                 transition: "background-color 0.3s, color 0.3s",
//                 position: "absolute",
//                 width: "46px",
//                 height: "80px",
//               }}
//               onClick={() => handleDateClick(day)}
//             >
//               <div style={{ textAlign: "center" }}>
//                 <p>
//                   {
//                     [
//                       "Tue",
//                       "Wed",
//                       "Thu",
//                       "Fri",
//                       "Sat",
//                       "Sun",
//                       "Mon",
//                       "Tue",
//                       "Wed",
//                       "Thu",
//                       "Fri",
//                     ][index]
//                   }
//                 </p>
//                 <p style={{ fontWeight: "bold", fontSize: "16px" }}>{day}</p>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//       <table
//         style={{
//           borderCollapse: "separate",
//           borderSpacing: "10px",
//           width: "60%",
//           textAlign: "center",
//           marginTop: "140px",
//         }}
//       >
//         <thead>
//           <tr style={{ backgroundColor: "#46a2f5", color: "white" }}>
//             <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>ID</th>
//             <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//               Tank No.
//             </th>
//             <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//               Time
//             </th>
//             <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//               PUMP
//             </th>
//             <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//               MOTOR
//             </th>
//             <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//               FEEDER
//             </th>
//             <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//               HEATER
//             </th>
//             <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//               Delete
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRecords.length > 0 ? (
//             filteredRecords.map((record) => (
//               <tr key={records.id}>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #46a2f5",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {records.id}
//                 </td>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #46a2f5",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {records.tank_no}
//                 </td>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #46a2f5",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {records.date_time}
//                 </td>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #46a2f5",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {records.pump}
//                 </td>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #46a2f5",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {records.motor}
//                 </td>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #46a2f5",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {records.feeder}
//                 </td>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #46a2f5",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {records.heater}
//                 </td>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #46a2f5",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   <button
//                     style={{ border: 0, backgroundColor: "white" }}
//                     onClick={() => handleDelete(record.id)}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 448 512"
//                       fill="#46a2f5"
//                       style={{ width: "20px", height: "20px" }}
//                     >
//                       <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
//                     </svg>
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 colSpan="8"
//                 style={{
//                   padding: "10px",
//                   border: "1px solid #46a2f5",
//                   backgroundColor: "white",
//                 }}
//               >
//                 No records found for the selected date.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Conttable({ selectedDate, setSelectedDate, records }) {
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = records.filter(
        (record) => record.date_time === selectedDate.date_time
      );
      console.log("Filtered Records:", filtered);
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords([]); // Clear filtered records if no date is selected
    }
  }, [selectedDate, records]); // Update whenever selectedDate or records change

  const handleDateClick = (date_time) => {
    const day = new Date(2024, 9, date_time).toLocaleString("default", {
      weekday: "long",
    });
    setSelectedDate({ day, date_time }); // Pass both values
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3002/records/${id}`)
      .then((response) => {
        console.log("Record deleted:", response.data);
        // Update filtered records after deletion
        setFilteredRecords(
          filteredRecords.filter((record) => record.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  return (
    <>
      <h1 style={{ color: "#1f639e" }}>October 2024</h1>
      <div style={{ display: "flex", position: "relative" }}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].map(
          (day) => (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              style={{
                border: "1px solid gray",
                padding: "10px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              <p style={{ margin: "0", textAlign: "center" }}>{day}</p>
            </div>
          )
        )}
      </div>
      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h3>Records for {selectedDate ? selectedDate.day : "Select a Date"}</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Tank Name</th>
              <th>Treatment</th>
              <th>State</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.tank}</td>
                  <td>{record.treatment}</td>
                  <td>{record.state}</td>
                  <td>{record.time}</td>
                  <td>
                    <button onClick={() => handleDelete(record.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
