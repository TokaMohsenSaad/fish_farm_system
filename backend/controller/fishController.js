import pool from "../database_connection/db.js";

///endpoint used to retrieve all tank details
export const getTanksWithFishImages = async (req, res) => {
  try {
    // Query to get data from tanks table
    const [tanks] = await pool.query("SELECT * FROM tanks");

    // Iterate through each tank and retrieve the fish images using fish_name
    for (let tank of tanks) {
      const [fishData] = await pool.query(
        "SELECT fish_image1, fish_image2, fish_image3, fish_image4 FROM fish WHERE fish_name = ?",
        [tank.fish_name]
      );

      // Add fish images to the tank object
      if (fishData.length > 0) {
        tank.fish_images = {
          fish_image1: fishData[0].fish_image1
            ? fishData[0].fish_image1.toString("base64")
            : null,
          fish_image2: fishData[0].fish_image2
            ? fishData[0].fish_image2.toString("base64")
            : null,
          fish_image3: fishData[0].fish_image3
            ? fishData[0].fish_image3.toString("base64")
            : null,
          fish_image4: fishData[0].fish_image4
            ? fishData[0].fish_image4.toString("base64")
            : null,
        };
      }
    }

    // Send the response with the tanks and their associated fish images
    res.status(200).json(tanks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

////get a specific tank data
// export const getTankofID = async (req, res) => {
//   try {
//     const { tank_no } = req.params;

//     // Fetch the tank data
//     const [tankResult] = await pool.query(
//       "SELECT tank_no, fish_name, Ph, temp, turbidity FROM tanks WHERE tank_no = ?",
//       [tank_no]
//     );

//     if (tankResult.length === 0) {
//       return res.status(404).json({ message: "Tank not found" });
//     }

//     const tank = tankResult[0];

//     // Fetch fish images based on fish_name
//     const [fishData] = await pool.query(
//       "SELECT fish_image1, fish_image2, fish_image3, fish_image4 FROM fish WHERE fish_name = ?",
//       [tank.fish_name]
//     );

//     if (fishData.length > 0) {
//       tank.fish_images = {
//         fish_image1: fishData[0].fish_image1
//           ? fishData[0].fish_image1.toString("base64").substring(0, 100) + "..." // Limit base64 size for testing
//           : null,
//         fish_image2: fishData[0].fish_image2
//           ? fishData[0].fish_image2.toString("base64").substring(0, 100) + "..."
//           : null,
//         fish_image3: fishData[0].fish_image3
//           ? fishData[0].fish_image3.toString("base64").substring(0, 100) + "..."
//           : null,
//         fish_image4: fishData[0].fish_image4
//           ? fishData[0].fish_image4.toString("base64").substring(0, 100) + "..."
//           : null,
//       };
//     }

//     res.status(200).json(tank);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const getTankofID = async (req, res) => {
  try {
    const { tank_no } = req.params;

    // Fetch the tank data
    const [tankResult] = await pool.query(
      "SELECT tank_no, fish_name, Ph, temp, turbidity FROM tanks WHERE tank_no = ?",
      [tank_no]
    );

    if (tankResult.length === 0) {
      return res.status(404).json({ message: "Tank not found" });
    }

    const tank = tankResult[0];

    // Fetch fish images based on fish_name
    const [fishData] = await pool.query(
      "SELECT fish_image1, fish_image2, fish_image3, fish_image4 FROM fish WHERE fish_name = ?",
      [tank.fish_name]
    );

    if (fishData.length > 0) {
      tank.fish_images = {
        fish_image1: fishData[0].fish_image1
          ? `data:image/jpeg;base64,${fishData[0].fish_image1.toString(
              "base64"
            )}`
          : null,
        fish_image2: fishData[0].fish_image2
          ? `data:image/jpeg;base64,${fishData[0].fish_image2.toString(
              "base64"
            )}`
          : null,
        fish_image3: fishData[0].fish_image3
          ? `data:image/jpeg;base64,${fishData[0].fish_image3.toString(
              "base64"
            )}`
          : null,
        fish_image4: fishData[0].fish_image4
          ? `data:image/jpeg;base64,${fishData[0].fish_image4.toString(
              "base64"
            )}`
          : null,
      };
    }

    res.status(200).json(tank);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
