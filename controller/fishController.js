import pool from "../database_connection/db.js"; // Make sure you're importing the pool correctly

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
