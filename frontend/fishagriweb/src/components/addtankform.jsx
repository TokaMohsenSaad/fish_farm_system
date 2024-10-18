import { useState } from "react";

export default function AddingForm({ addTank }) {
  const [tankName, setTankName] = useState("");

  const handleAddTank = async () => {
    if (tankName) {
      try {
        const response = await fetch(
          "http://localhost:9000/api/tank/add-tank",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tank_no: tankName }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || "Failed to add tank");
          return;
        }

        const newTank = await response.json();
        console.log("new tank number: ", newTank.tank_no);
        addTank(newTank.tank_no); // Pass the tank number to the parent component or update state
        setTankName(newTank.tank_no);
      } catch (error) {
        console.error("Error adding tank:", error);
      }
    } else {
      alert("Please enter tank name");
    }
  };

  return (
    <div
      style={{
        width: "430px",
        height: "300px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <h1
        style={{ color: "#46a2f5", fontWeight: "normal", marginLeft: "-12%" }}
      >
        Adding a Tank Form
      </h1>
      <input
        type="text"
        placeholder="  Tank Name"
        className="inputname"
        value={tankName}
        onChange={(e) => setTankName(e.target.value)}
        style={{ marginLeft: "-10%", marginTop: "10px" }}
      />
      <button
        onClick={handleAddTank}
        className="addtank"
        style={{
          textDecoration: "none",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
          marginLeft: "-10%",
        }}
      >
        <p
          style={{ textAlign: "center", fontWeight: "bold", marginTop: "15px" }}
        >
          Done
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          style={{ width: "20px", height: "20px" }}
        >
          <path
            fill="white"
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          />
        </svg>
      </button>
    </div>
  );
}
