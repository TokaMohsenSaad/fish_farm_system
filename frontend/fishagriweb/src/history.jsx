import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import SortAndFiltersBar from "./components/sortandfilter";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function History() {
  const [historyRecords, setHistoryRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // Track the selected record for chart display
  const [isSortBarOpen, setSortBarOpen] = useState(false);
  const [isFiltersBarOpen, setFiltersBarOpen] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [filterOptions, setFilterOptions] = useState({ date: "", time: "" });

  // Reset Filters and Sort
  const handleResetFiltersAndSort = () => {
    setFilterOptions({ date: null, time: null });
    setSortOption(null);
  };

  useEffect(() => {
    const fetchHistoryRecords = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/records");
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setHistoryRecords(data.historyrecord || data || []); // Handle direct array response
        setFilteredRecords(data.historyrecord || data || []);
      } catch (error) {
        console.error("Error fetching history records:", error);
      }
    };

    fetchHistoryRecords();
  }, []);

  // Function for filtering and sorting records
  const filterAndSortRecords = () => {
    let records = [...historyRecords];

    // Apply filters
    if (filterOptions.date) {
      records = records.filter((record) => record.date === filterOptions.date);
    }
    if (filterOptions.time) {
      console.log("Filtering by time:", filterOptions.time); // Log selected time filter
      records = records.filter((record) => {
        console.log("Record time:", record.time); // Log each record's time
        return record.time && record.time.includes(filterOptions.time); // Adjust as needed
      });
    }

    // Apply sorting
    if (sortOption) {
      if (sortOption === "phLow") {
        records.sort((a, b) => a.ph - b.ph);
      } else if (sortOption === "phHigh") {
        records.sort((a, b) => b.ph - a.ph);
      } else if (sortOption === "turbidityLow") {
        records.sort((a, b) => a.turbidity - b.turbidity);
      } else if (sortOption === "turbidityHigh") {
        records.sort((a, b) => b.turbidity - a.turbidity);
      } else if (sortOption === "tempLow") {
        records.sort((a, b) => a.temp - b.temp);
      } else if (sortOption === "tempHigh") {
        records.sort((a, b) => b.temp - a.temp);
      }
    }

    setFilteredRecords(records);
  };

  // Call filtering and sorting when relevant state changes
  useEffect(() => {
    filterAndSortRecords();
  }, [sortOption, filterOptions, historyRecords]);

  const handleSortChange = (sortType) => {
    setSortOption(sortType);
    setSortBarOpen(!isSortBarOpen);
  };

  const handleFilterApply = () => {
    const date = filterOptions.date;
    const time = filterOptions.time;
    setFilterOptions({ date, time });
    setFiltersBarOpen(!isFiltersBarOpen);
  };

  const handleClearHistory = async () => {
    try {
      await fetch("http://localhost:9000/api/historyrecord", {
        method: "DELETE",
      });
      setHistoryRecords([]); // Clear the local state
      setFilteredRecords([]); // Clear filtered records
      alert("History cleared successfully!");
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record); // Set the selected record for chart display
  };

  const handleDeleteRecord = async (id) => {
    try {
      await fetch(`http://localhost:9000/api/historyrecord/${id}`, {
        method: "DELETE",
      });
      setHistoryRecords(historyRecords.filter((record) => record.id !== id));
      setFilteredRecords(filteredRecords.filter((record) => record.id !== id));
      alert("Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const data = {
    labels: ["pH", "Temperature", "Turbidity"],
    datasets: [
      {
        data: [
          selectedRecord?.ph || 0,
          selectedRecord?.temp || 0,
          selectedRecord?.turbidity || 0,
        ],
        backgroundColor: ["#46a2f5", "#497e7c", "#284e4a"],
        borderColor: "white", // Color for the inner border
        borderWidth: 3, // Width of the border
        hoverOffset: 4, // Effect on hover
      },
    ],
  };

  // Handle filter change from child component
  const handleFilterChange = ({ date, time, filteredRecords }) => {
    console.log("Received filtered records:", filteredRecords);
    setFilteredRecords(filteredRecords); // Update state with filtered records
  };

  return (
    <>
      <SortAndFiltersBar
        isSortBarOpen={isSortBarOpen}
        toggleSortBar={() => setSortBarOpen(!isSortBarOpen)}
        onSortChange={setSortOption}
        isFiltersBarOpen={isFiltersBarOpen}
        toggleFiltersBar={() => setFiltersBarOpen(!isFiltersBarOpen)}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange} // Pass the filter change handler
        filteredRecords={historyRecords}
      />
      <button onClick={handleResetFiltersAndSort}>Reset Filters & Sort</button>

      <div className="back" style={{ overflowY: "scroll", display: "flex" }}>
        <div style={{ marginTop: "100px", marginLeft: "100px" }}>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <h1 style={{ color: "#1f639e" }}>History</h1>
            </li>
            <hr />
            <li>
              <button
                style={{
                  display: "flex",
                  border: 0,
                  backgroundColor: "transparent",
                  fontSize: "25px",
                  color: "#1f639e",
                  fontWeight: "bold",
                }}
                onClick={handleClearHistory}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="#46a2f5"
                  style={{ width: "30px", height: "30px" }}
                >
                  <path
                    fill="#1f639e"
                    d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                  />
                </svg>
                Clear History
              </button>
            </li>
            <hr />
            <li>
              <button
                style={{
                  display: "flex",
                  border: 0,
                  backgroundColor: "transparent",
                  fontSize: "25px",
                  color: "#1f639e",
                  fontWeight: "bold",
                }}
                onClick={() => setSortBarOpen(!isSortBarOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  style={{ width: "30px", height: "30px" }}
                >
                  <path
                    fill="#1f639e"
                    d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8h256c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"
                  />
                </svg>
                Sort
              </button>
              <hr />
              <button
                style={{
                  display: "flex",
                  border: 0,
                  backgroundColor: "transparent",
                  fontSize: "25px",
                  color: "#1f639e",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
                onClick={() => setFiltersBarOpen(!isFiltersBarOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{ width: "30px", height: "30px" }}
                >
                  <path
                    fill="#1f639e"
                    d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.2L336 284.3V432c0 10.6-5.5 20.4-14.5 26.1l-96 56c-9.9 5.8-22.1 5.8-32 0s-14.5-16.4-14.5-26.1V284.3L9.1 97.1C-.7 85.4-2.6 70.8 3.9 54.9z"
                  />
                </svg>
                Filters
              </button>
            </li>
          </ul>
        </div>
        <div
          style={{
            marginTop: "100px",
            marginLeft: "300px",
            position: "relative",
          }}
        >
          {selectedRecord && (
            <div
              style={{
                width: "250px",
                height: "250px",
                marginBottom: "20px",
                marginLeft: "700px",
                position: "fixed",
              }}
            >
              <Doughnut
                data={data}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
              <h3 style={{ marginTop: "20px", color: "#1f639e" }}>
                Tank No: {selectedRecord.tank_id}
              </h3>
            </div>
          )}
          <div
            style={{
              width: "600px",
              height: "150px",
            }}
          >
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <div
                  key={record.id}
                  style={{
                    margin: "10px",
                    padding: "10px",
                    border: "1px solid #46a2f5",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRecordClick(record)}
                >
                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Date and Time: {record.date_time}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRecord(record.id);
                      }}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#ff4c4c",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        fill="#c24a42"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginLeft: "330px",
                        }}
                      >
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </button>
                  </div>
                  <div
                    style={{
                      width: "550px",
                      height: "1px",
                      backgroundColor: "#46a2f5",
                    }}
                  ></div>
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Tank: {record.tank_id}
                  </p>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: "#4a7ea8",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        position: "relative",
                        marginTop: "5px",
                        marginRight: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "9px",
                          height: "9px",
                          backgroundColor: "white",
                          marginTop: "3px",
                        }}
                      ></div>
                    </div>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#4a7ea8",
                        fontSize: "18px",
                      }}
                    >
                      PH: {record.ph}
                    </p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: "#497e7c",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        position: "relative",
                        marginTop: "5px",
                        marginRight: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "9px",
                          height: "9px",
                          backgroundColor: "white",
                          marginTop: "3px",
                        }}
                      ></div>
                    </div>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#497e7c",
                        fontSize: "18px",
                      }}
                    >
                      Temperature: {record.temp} °C
                    </p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: "#284e4a",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        position: "relative",
                        marginTop: "5px",
                        marginRight: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "9px",
                          height: "9px",
                          backgroundColor: "white",
                          marginTop: "3px",
                        }}
                      ></div>
                    </div>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#284e4a",
                        fontSize: "18px",
                      }}
                    >
                      Turbidity: {record.turbidity} NTU
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No history records available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
