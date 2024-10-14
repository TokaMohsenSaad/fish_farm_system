import { sleep } from "./api";

const getAllUsers = async () => {
  const res = await fetch("http://localhost:9000/api/users/manage");
  const data = await res.json();
  console.log(data);
  return data;
  // await sleep(2000);
  // // throw new Error("Failed to fetch users");
};

const addEmployeeApi = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:9000/api/users/manage/employee/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    // Check if the response status indicates an error
    if (!response.ok) {
      throw new Error(data.message || "Failed to add employee");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in API fetch:", error);
    throw error;
  }
};

// const addAdminUrl = /manage/admin/:id;

const addAdminApi = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:9000/api/users/manage/admin/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: id,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }

  // await sleep(2000);
  // return {
  //   status: 200,
  //   message: "database is updated with the new admin",
  // };

  // throw new Error("Failed to update admin");
};

const rejectApi = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:9000/api/users/manage/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: id,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }

  // await sleep(2000);
  // return {
  //   status: 200,
  //   message: "database is updated with the deleted employee",
  // };

  // throw new Error("Failed to delete admin");
};
export { getAllUsers, addEmployeeApi, addAdminApi, rejectApi };
