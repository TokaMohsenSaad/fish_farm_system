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

import React, { useState, useEffect } from "react";
import axios from "axios";
import Conttable from "./components/tables/control"; // Adjust the path as needed
import { records } from "./db.json"; // If you're still using this import, ensure it's necessary

export default function Control() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTreatment, setSelectedTreatment] =
    useState("Select Treatment");
  const [tankName, setTankName] = useState("");
  const [treatmentState, setTreatmentState] = useState("active");
  const [selectedDate, setSelectedDate] = useState(null);
  const [records, setRecords] = useState([]); // This state will be passed to Conttable

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
        date_time: selectedDate.date_time,
        tank: tankName,
        treatment: selectedTreatment,
        state: treatmentState,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      console.log("Record added:", response.data);
      fetchRecords(); // Refresh the records after adding
      clearForm();
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  const fetchRecords = async () => {
    if (!selectedDate) return;

    try {
      const formattedDate = selectedDate.date_time; // Assuming it's already formatted as "YYYY-MM-DD"
      const response = await axios.get(
        `http://localhost:9000/api/controls?date_time=${formattedDate}`
      );

      if (response.status === 200) {
        console.log("Fetched Records:", response.data);
        setRecords(response.data); // Update records state
      } else {
        console.log("No records found for the selected date.");
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchRecords();
    }
  }, [selectedDate]);

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
        <Conttable
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          records={records} // Pass records as a prop
        />
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "700px",
            height: "350px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <h1 style={{ color: "#1f639e" }}>Manual Treatment :</h1>
          <input
            type="text"
            placeholder="Tank Name"
            className="inputname"
            value={tankName}
            onChange={(e) => setTankName(e.target.value)}
          />
          <div style={{ display: "flex", marginTop: "20px" }}>
            <h3 style={{ color: "#1f639e" }}>Treatment : </h3>
            <div style={{ position: "relative", marginLeft: "10px" }}>
              <button
                className="droptreat"
                onClick={toggleDropdown}
                style={{ padding: "4px", cursor: "pointer" }}
              >
                {selectedTreatment}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{ width: "15px", height: "15px", marginLeft: "50px" }}
                >
                  <path
                    fill="black"
                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                  />
                </svg>
              </button>
              {isDropdownVisible && (
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    borderRadius: "4px",
                    marginTop: "5px",
                    zIndex: 1000,
                  }}
                >
                  <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                    {["PUMP", "MOTOR", "FEEDER", "HEATER"].map((item) => (
                      <li
                        key={item}
                        style={{ padding: "10px", cursor: "pointer" }}
                        onClick={() => handleItemClick(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <h3 style={{ color: "#1f639e" }}>State : </h3>
            <div
              style={{ marginLeft: "10px", marginTop: "7px", display: "flex" }}
            >
              <label style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="state"
                  value="active"
                  checked={treatmentState === "active"}
                  onChange={handleStateChange}
                />{" "}
                Active
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="state"
                  value="inactive"
                  checked={treatmentState === "inactive"}
                  onChange={handleStateChange}
                />{" "}
                Inactive
              </label>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#1f639e",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Submit Treatment
          </button>
        </div>
      </div>
    </div>
  );
}
