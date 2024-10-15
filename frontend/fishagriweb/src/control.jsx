// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Conttable from "./components/tables/control";
// import { records } from "./db.json";

// export default function Control() {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedTreatment, setSelectedTreatment] =
//     useState("Select Treatment");
//   const [tankName, setTankName] = useState("");
//   const [treatmentState, setTreatmentState] = useState("active");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [records, setRecords] = useState([]);

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible); // Toggle visibility
//   };

//   const handleItemClick = (treatment) => {
//     setSelectedTreatment(treatment); // Set selected treatment
//     setDropdownVisible(false); // Close dropdown after selection
//   };

//   const handleStateChange = (e) => {
//     setTreatmentState(e.target.value); // Handle state change
//   };

//   const handleSubmit = async () => {
//     // Ensure that all fields are filled
//     if (
//       !tankName ||
//       selectedTreatment === "Select Treatment" ||
//       !selectedDate
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:3002/records`, {
//         day: selectedDate.day,
//         daynum: selectedDate.daynum,
//         tank: tankName,
//         treatment: selectedTreatment,
//         state: treatmentState,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       });
//       console.log("Record added:", response.data);
//       fetchRecords(); // Refresh the records after adding
//       clearForm();
//     } catch (error) {
//       console.error("Error adding record:", error);
//     }
//   };

//   const fetchRecords = async () => {
//     if (!selectedDate) return;

//     try {
//       // Ensure selectedDate is in the correct format (e.g., "YYYY-MM-DD")
//       const formattedDate = selectedDate.daynum; // Assuming it's already formatted as "YYYY-MM-DD"

//       const response = await axios.get(
//         `http://localhost:9000/api/controls?daynum=${formattedDate}`
//       );

//       if (response.status === 200) {
//         console.log("Fetched Records:", response.data);
//         setRecords(response.data);
//       } else {
//         console.log("No records found for the selected date.");
//       }
//     } catch (error) {
//       console.error("Error fetching records:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedDate) {
//       fetchRecords();
//     }
//   }, [selectedDate]);

//   const clearForm = () => {
//     setTankName("");
//     setSelectedTreatment("Select Treatment");
//     setTreatmentState("active");
//   };

//   return (
//     <div className="back">
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "start",
//           alignItems: "center",
//           marginTop: "60px",
//         }}
//       >
//         <Conttable
//           selectedDate={selectedDate}
//           setSelectedDate={setSelectedDate}
//           recordss={records}
//         />
//         <div
//           style={{
//             backgroundColor: "white",
//             padding: "20px",
//             borderRadius: "8px",
//             width: "700px",
//             height: "350px",
//             marginTop: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           <h1 style={{ color: "#1f639e" }}>Manual Treatment :</h1>
//           <input
//             type="text"
//             placeholder="Tank Name"
//             className="inputname"
//             value={tankName}
//             onChange={(e) => setTankName(e.target.value)}
//           />
//           <div style={{ display: "flex", marginTop: "20px" }}>
//             <h3 style={{ color: "#1f639e" }}>Treatment : </h3>
//             <div style={{ position: "relative", marginLeft: "10px" }}>
//               <button
//                 className="droptreat"
//                 onClick={toggleDropdown}
//                 style={{ padding: "4px", cursor: "pointer" }}
//               >
//                 {selectedTreatment}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 512 512"
//                   style={{ width: "15px", height: "15px", marginLeft: "50px" }}
//                 >
//                   <path
//                     fill="black"
//                     d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
//                   />
//                 </svg>
//               </button>
//               {isDropdownVisible && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     backgroundColor: "white",
//                     boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//                     borderRadius: "4px",
//                     marginTop: "5px",
//                     zIndex: 1000,
//                   }}
//                 >
//                   <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
//                     {["PUMP", "MOTOR", "FEEDER", "HEATER"].map((item) => (
//                       <li
//                         key={item}
//                         style={{ padding: "10px", cursor: "pointer" }}
//                         onClick={() => handleItemClick(item)}
//                       >
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div style={{ display: "flex", marginTop: "20px" }}>
//             <h3 style={{ color: "#1f639e" }}>State : </h3>
//             <div
//               style={{ marginLeft: "10px", marginTop: "7px", display: "flex" }}
//             >
//               <label style={{ marginRight: "10px" }}>
//                 <input
//                   type="radio"
//                   name="state"
//                   value="active"
//                   checked={treatmentState === "active"}
//                   onChange={handleStateChange}
//                 />{" "}
//                 Active
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="radio"
//                   name="state"
//                   value="inactive"
//                   checked={treatmentState === "inactive"}
//                   onChange={handleStateChange}
//                 />{" "}
//                 Inactive
//               </label>
//             </div>
//           </div>
//           <button
//             onClick={handleSubmit}
//             style={{
//               marginTop: "20px",
//               padding: "10px",
//               backgroundColor: "#1f639e",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//             }}
//           >
//             Submit Treatment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Control() {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedTreatment, setSelectedTreatment] =
//     useState("Select Treatment");
//   const [tankName, setTankName] = useState("");
//   const [treatmentState, setTreatmentState] = useState("active");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [records, setRecords] = useState([]);

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
//     if (selectedDate) {
//       fetchRecords();
//     }
//   }, [selectedDate]);

//   // const fetchRecordsbyDate = async () => {
//   //   if (!selectedDate) return;

//   //   try {
//   //     // Ensure selectedDate is in the correct format (e.g., "YYYY-MM-DD")
//   //     const formattedDate = selectedDate.daynum; // Assuming it's already formatted as "YYYY-MM-DD"

//   //     const response = await axios.get(
//   //       `http://localhost:9000/api/controls?daynum=${formattedDate}`
//   //     );

//   //     if (response.status === 200) {
//   //       console.log("Fetched Records:", response.data);
//   //       setRecords(response.data);
//   //     } else {
//   //       console.log("No records found for the selected date.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching records:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (selectedDate) {
//   //     const filtered = records.filter(
//   //       (record) => record.daynum === selectedDate.daynum
//   //     );
//   //     console.log("Filtered Records:", filtered);
//   //     setFilteredRecords(filtered);
//   //   } else {
//   //     setFilteredRecords([]); // Clear filtered records if no date is selected
//   //   }
//   // }, [selectedDate, records]);

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

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible); // Toggle visibility
//   };

//   const handleItemClick = (treatment) => {
//     setSelectedTreatment(treatment); // Set selected treatment
//     setDropdownVisible(false); // Close dropdown after selection
//   };

//   const handleStateChange = (e) => {
//     setTreatmentState(e.target.value); // Handle state change
//   };

//   const handleSubmit = async () => {
//     // Ensure that all fields are filled
//     if (
//       !tankName ||
//       selectedTreatment === "Select Treatment" ||
//       !selectedDate
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:3002/records`, {
//         day: selectedDate.day,
//         daynum: selectedDate.daynum,
//         tank: tankName,
//         treatment: selectedTreatment,
//         state: treatmentState,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       });
//       console.log("Record added:", response.data);
//       fetchRecords(); // Refresh the records after adding
//       clearForm();
//     } catch (error) {
//       console.error("Error adding record:", error);
//     }
//   };

//   const fetchRecords = async () => {
//     if (!selectedDate) return;

//     try {
//       // Ensure selectedDate is in the correct format (e.g., "YYYY-MM-DD")
//       const formattedDate = selectedDate.daynum; // Assuming it's already formatted as "YYYY-MM-DD"

//       const response = await axios.get(
//         `http://localhost:9000/api/controls?daynum=${formattedDate}`
//       );

//       if (response.status === 200) {
//         console.log("Fetched Records:", response.data);
//         setRecords(response.data);
//       } else {
//         console.log("No records found for the selected date.");
//       }
//     } catch (error) {
//       console.error("Error fetching records:", error);
//     }
//   };

//   const clearForm = () => {
//     setTankName("");
//     setSelectedTreatment("Select Treatment");
//     setTreatmentState("active");
//   };

//   return (
//     <div className="back">
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "start",
//           alignItems: "center",
//           marginTop: "60px",
//         }}
//       >
//         <>
//           <h1 style={{ color: "#1f639e" }}>October 2024</h1>
//           <div style={{ display: "flex", position: "relative" }}>
//             {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].map(
//               (day, index) => (
//                 <div
//                   key={index}
//                   className="memberdate"
//                   style={{
//                     left: `${index * 55 - 300}px`,
//                     top: `${Math.abs(5 - index) * 10}px`,
//                     backgroundColor:
//                       selectedDate?.daynum === day ? "#46a2f5" : "white",
//                     color: selectedDate?.daynum === day ? "white" : "black",
//                     padding: "7px",
//                     border: "1px solid #46a2f5",
//                     borderRadius: "5px",
//                     transition: "background-color 0.3s, color 0.3s",
//                     position: "absolute",
//                     width: "46px",
//                     height: "80px",
//                   }}
//                   onClick={() => handleDateClick(day)}
//                 >
//                   <div style={{ textAlign: "center" }}>
//                     <p>
//                       {
//                         [
//                           "Tue",
//                           "Wed",
//                           "Thu",
//                           "Fri",
//                           "Sat",
//                           "Sun",
//                           "Mon",
//                           "Tue",
//                           "Wed",
//                           "Thu",
//                           "Fri",
//                         ][index]
//                       }
//                     </p>
//                     <p style={{ fontWeight: "bold", fontSize: "16px" }}>
//                       {day}
//                     </p>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//           <table
//             style={{
//               borderCollapse: "separate",
//               borderSpacing: "10px",
//               width: "60%",
//               textAlign: "center",
//               marginTop: "140px",
//             }}
//           >
//             <thead>
//               <tr style={{ backgroundColor: "#46a2f5", color: "white" }}>
//                 <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                   ID
//                 </th>
//                 <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                   Tank No.
//                 </th>
//                 <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                   Time
//                 </th>
//                 <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                   PUMP
//                 </th>
//                 <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                   MOTOR
//                 </th>
//                 <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                   FEEDER
//                 </th>
//                 <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                   HEATER
//                 </th>
//                 <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                   Delete
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRecords.length > 0 ? (
//                 filteredRecords.map((record) => (
//                   <tr key={records.id}>
//                     <td
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #46a2f5",
//                         backgroundColor: "white",
//                       }}
//                     >
//                       {records.id}
//                     </td>
//                     <td
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #46a2f5",
//                         backgroundColor: "white",
//                       }}
//                     >
//                       {records.tank_no}
//                     </td>
//                     <td
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #46a2f5",
//                         backgroundColor: "white",
//                       }}
//                     >
//                       {records.date_time}
//                     </td>
//                     <td
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #46a2f5",
//                         backgroundColor: "white",
//                       }}
//                     >
//                       {records.pump}
//                     </td>
//                     <td
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #46a2f5",
//                         backgroundColor: "white",
//                       }}
//                     >
//                       {records.motor}
//                     </td>
//                     <td
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #46a2f5",
//                         backgroundColor: "white",
//                       }}
//                     >
//                       {records.feeder}
//                     </td>
//                     <td
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #46a2f5",
//                         backgroundColor: "white",
//                       }}
//                     >
//                       {records.heater}
//                     </td>
//                     <td
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #46a2f5",
//                         backgroundColor: "white",
//                       }}
//                     >
//                       <button
//                         style={{ border: 0, backgroundColor: "white" }}
//                         onClick={() => handleDelete(record.id)}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 448 512"
//                           fill="#46a2f5"
//                           style={{ width: "20px", height: "20px" }}
//                         >
//                           <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
//                         </svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #46a2f5",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     No records found for the selected date.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </>
//         <div
//           style={{
//             backgroundColor: "white",
//             padding: "20px",
//             borderRadius: "8px",
//             width: "700px",
//             height: "350px",
//             marginTop: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           <h1 style={{ color: "#1f639e" }}>Manual Treatment :</h1>
//           <input
//             type="text"
//             placeholder="Tank Name"
//             className="inputname"
//             value={tankName}
//             onChange={(e) => setTankName(e.target.value)}
//           />
//           <div style={{ display: "flex", marginTop: "20px" }}>
//             <h3 style={{ color: "#1f639e" }}>Treatment : </h3>
//             <div style={{ position: "relative", marginLeft: "10px" }}>
//               <button
//                 className="droptreat"
//                 onClick={toggleDropdown}
//                 style={{ padding: "4px", cursor: "pointer" }}
//               >
//                 {selectedTreatment}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 512 512"
//                   style={{ width: "15px", height: "15px", marginLeft: "50px" }}
//                 >
//                   <path
//                     fill="black"
//                     d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
//                   />
//                 </svg>
//               </button>
//               {isDropdownVisible && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     backgroundColor: "white",
//                     boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//                     borderRadius: "4px",
//                     marginTop: "5px",
//                     zIndex: 1000,
//                   }}
//                 >
//                   <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
//                     {["PUMP", "MOTOR", "FEEDER", "HEATER"].map((item) => (
//                       <li
//                         key={item}
//                         style={{ padding: "10px", cursor: "pointer" }}
//                         onClick={() => handleItemClick(item)}
//                       >
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div style={{ display: "flex", marginTop: "20px" }}>
//             <h3 style={{ color: "#1f639e" }}>State : </h3>
//             <div
//               style={{ marginLeft: "10px", marginTop: "7px", display: "flex" }}
//             >
//               <label style={{ marginRight: "10px" }}>
//                 <input
//                   type="radio"
//                   name="state"
//                   value="active"
//                   checked={treatmentState === "active"}
//                   onChange={handleStateChange}
//                 />{" "}
//                 Active
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="radio"
//                   name="state"
//                   value="inactive"
//                   checked={treatmentState === "inactive"}
//                   onChange={handleStateChange}
//                 />{" "}
//                 Inactive
//               </label>
//             </div>
//           </div>
//           <button
//             onClick={handleSubmit}
//             style={{
//               marginTop: "20px",
//               padding: "10px",
//               backgroundColor: "#1f639e",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//             }}
//           >
//             Submit Treatment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Control() {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedTreatment, setSelectedTreatment] =
//     useState("Select Treatment");
//   const [tankName, setTankName] = useState("");
//   const [treatmentState, setTreatmentState] = useState("active");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [records, setRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);

//   // Fetch records when the component mounts or when the selectedDate changes
//   useEffect(() => {
//     const fetchRecords = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/api/controls");
//         if (response.status === 200) {
//           setRecords(response.data);
//         } else {
//           setRecords([]);
//         }
//       } catch (error) {
//         console.error("Error fetching records:", error);
//       }
//     };

//     fetchRecords();
//   }, [selectedDate, records]);

//   // Filter records by selected date
//   useEffect(() => {
//     if (selectedDate) {
//       const filtered = records.filter(
//         (record) => record.daynum === selectedDate.daynum
//       );
//       setFilteredRecords(filtered);
//     } else {
//       setFilteredRecords(records); // Show all records if no date is selected
//     }
//   }, [selectedDate, records]);

//   const fetchRecordsbyDate = async () => {
//     if (!selectedDate) return;

//     try {
//       // Ensure selectedDate is in the correct format (e.g., "YYYY-MM-DD")
//       const formattedDate = selectedDate.daynum; // Assuming it's already formatted as "YYYY-MM-DD"

//       const response = await axios.get(
//         `http://localhost:9000/api/controls?daynum=${formattedDate}`
//       );

//       if (response.status === 200) {
//         console.log("Fetched Records:", response.data);
//         setRecords(response.data);
//       } else {
//         console.log("No records found for the selected date.");
//       }
//     } catch (error) {
//       console.error("Error fetching records:", error);
//     }
//   };

//   const handleDateClick = (daynum) => {
//     const day = new Date(2024, 10, daynum).toLocaleString("default", {
//       weekday: "long",
//     });
//     console.log(day);
//     setSelectedDate({ day, daynum });
//     fetchRecordsbyDate();
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:9000/api/controls/${id}`)
//       .then((response) => {
//         console.log("Record deleted:", response.data);
//         setFilteredRecords(
//           filteredRecords.filter((record) => record.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error deleting record:", error);
//       });
//   };

//   return (
//     <div className="back">
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "start",
//           alignItems: "center",
//           marginTop: "60px",
//         }}
//       >
//         <h1 style={{ color: "#1f639e" }}>October 2024</h1>
//         <div style={{ display: "flex", position: "relative" }}>
//           {[
//             "11",
//             "12",
//             "14",
//             "15",
//             "16",
//             "17",
//             "18",
//             "19",
//             "20",
//             "21",
//             "22",
//           ].map((day, index) => (
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
//           ))}
//         </div>

//         <table
//           style={{
//             borderCollapse: "separate",
//             borderSpacing: "10px",
//             width: "60%",
//             textAlign: "center",
//             marginTop: "140px",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#46a2f5", color: "white" }}>
//               <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                 ID
//               </th>
//               <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                 Tank No.
//               </th>
//               <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                 Time
//               </th>
//               <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                 PUMP
//               </th>
//               <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                 MOTOR
//               </th>
//               <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                 FEEDER
//               </th>
//               <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                 HEATER
//               </th>
//               <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
//                 Delete
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRecords.length > 0 ? (
//               filteredRecords.map((record) => (
//                 <tr key={record.id}>
//                   <td
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #46a2f5",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     {record.id}
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #46a2f5",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     {record.tank_no}
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #46a2f5",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     {record.date_time}
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #46a2f5",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     {record.pump}
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #46a2f5",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     {record.motor}
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #46a2f5",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     {record.feeder}
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #46a2f5",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     {record.heater}
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #46a2f5",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     <button
//                       style={{ border: 0, backgroundColor: "white" }}
//                       onClick={() => handleDelete(record.id)}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 448 512"
//                         fill="#46a2f5"
//                         style={{ width: "20px", height: "20px" }}
//                       >
//                         <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
//                       </svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="8"
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #46a2f5",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   No records found for the selected date.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Control() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTreatment, setSelectedTreatment] =
    useState("Select Treatment");
  const [tankName, setTankName] = useState("");
  const [treatmentState, setTreatmentState] = useState("active");
  const [selectedDate, setSelectedDate] = useState(null);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/controls");

        if (response.status === 200) {
          console.log("Fetched Records:", response.data);
          setRecords(response.data);
        } else if (response.status === 404) {
          console.warn("No control records found.");
          setRecords([]);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    // Filter records when selectedDate changes
    if (selectedDate) {
      const filtered = records.filter((record) => {
        const recordDate = new Date(record.date_time); // Create a date object from date_time

        console.log("Record Date:", recordDate); // Log each record date
        console.log("Selected Date:", selectedDate); // Log the selected date

        return (
          recordDate.getFullYear() === selectedDate.year &&
          recordDate.getMonth() === selectedDate.month - 1 && // Adjust for month indexing
          recordDate.getDate() === Number(selectedDate.daynum) // Convert daynum to number for comparison
        );
      });

      console.log("Filtered Records:", filtered); // Log filtered records
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records); // Show all records if no date is selected
    }
  }, [selectedDate, records]);

  const handleDateClick = (daynum) => {
    const selectedDateObj = new Date(2024, 10, daynum); // October is month 9 in JS
    setSelectedDate({
      year: selectedDateObj.getFullYear(),
      month: selectedDateObj.getMonth(), // Store month in 1-indexed format
      daynum: daynum,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3002/records/${id}`)
      .then((response) => {
        console.log("Record deleted:", response.data);
        setFilteredRecords(
          filteredRecords.filter((record) => record.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleItemClick = (treatment) => {
    setSelectedTreatment(treatment);
    setDropdownVisible(false);
  };

  const handleStateChange = (e) => {
    setTreatmentState(e.target.value);
  };

  const handleSubmit = async () => {
    if (
      !tankName ||
      selectedTreatment === "Select Treatment" ||
      !selectedDate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3002/records`, {
        day: selectedDate.day,
        daynum: selectedDate.daynum,
        tank: tankName,
        treatment: selectedTreatment,
        state: treatmentState,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      console.log("Record added:", response.data);
      setRecords([...records, response.data]);
      clearForm();
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  const clearForm = () => {
    setTankName("");
    setSelectedTreatment("Select Treatment");
    setTreatmentState("active");
  };

  return (
    <div className="back">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <h1 style={{ color: "#1f639e" }}>October 2024</h1>
        <div style={{ display: "flex", position: "relative" }}>
          {[
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
          ].map((day, index) => (
            <div
              key={index}
              className="memberdate"
              style={{
                left: `${index * 55 - 300}px`,
                top: `${Math.abs(5 - index) * 10}px`,
                backgroundColor:
                  selectedDate?.daynum === day ? "#46a2f5" : "white",
                color: selectedDate?.daynum === day ? "white" : "black",
                padding: "7px",
                border: "1px solid #46a2f5",
                borderRadius: "5px",
                transition: "background-color 0.3s, color 0.3s",
                position: "absolute",
                width: "46px",
                height: "80px",
              }}
              onClick={() => handleDateClick(day)}
            >
              <div style={{ textAlign: "center" }}>
                <p>
                  {
                    [
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                    ][index]
                  }
                </p>
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>{day}</p>
              </div>
            </div>
          ))}
        </div>
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: "10px",
            width: "60%",
            textAlign: "center",
            marginTop: "140px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#46a2f5", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
                ID
              </th>
              <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
                Tank No.
              </th>
              <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
                Time
              </th>
              <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
                PUMP
              </th>
              <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
                MOTOR
              </th>
              <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
                FEEDER
              </th>
              <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
                HEATER
              </th>
              <th style={{ padding: "10px", border: "1px solid #46a2f5" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #46a2f5",
                      backgroundColor: "white",
                    }}
                  >
                    {record.id}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #46a2f5",
                      backgroundColor: "white",
                    }}
                  >
                    {record.tank_no}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #46a2f5",
                      backgroundColor: "white",
                    }}
                  >
                    {record.date_time}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #46a2f5",
                      backgroundColor: "white",
                    }}
                  >
                    {record.pump}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #46a2f5",
                      backgroundColor: "white",
                    }}
                  >
                    {record.motor}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #46a2f5",
                      backgroundColor: "white",
                    }}
                  >
                    {record.feeder}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #46a2f5",
                      backgroundColor: "white",
                    }}
                  >
                    {record.heater}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #46a2f5",
                      backgroundColor: "white",
                    }}
                  >
                    <button onClick={() => handleDelete(record.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: "10px" }}>
                  No records found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <h2 style={{ marginTop: "20px" }}>Add Treatment</h2>
          <input
            type="text"
            value={tankName}
            onChange={(e) => setTankName(e.target.value)}
            placeholder="Tank Name"
            required
          />
          <div>
            <button onClick={toggleDropdown}>{selectedTreatment}</button>
            {isDropdownVisible && (
              <div className="dropdown">
                {["PUMP", "MOTOR", "FEEDER", "HEATER"].map((treatment) => (
                  <div
                    key={treatment}
                    onClick={() => handleItemClick(treatment)}
                    className="dropdown-item"
                  >
                    {treatment}
                  </div>
                ))}
              </div>
            )}
          </div>
          <select value={treatmentState} onChange={handleStateChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
