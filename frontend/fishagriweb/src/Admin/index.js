import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

// import "../App.css";

import {
  getAllUsers,
  addEmployeeApi,
  addAdminApi,
  rejectApi,
} from "../api/users";
import styles from "./admin.module.css";

const WavingHand = () => {
  return <div className={styles.hand}>👋</div>;
};

const Admin = () => {
  const [dataUser, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [error, setError] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [rowsToShow, setRowsToShow] = useState(20);

  const [showEmployeeButtons, setShowEmployeeButtons] = useState([]);
  const [loadEmployee, setLoadEmployee] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState([]);
  const [loadingReject, setLoadingReject] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    // Render all users when the admin page is refreshed
    getAllUsers()
      .then((data) => {
        setData(data);
        setShowEmployeeButtons(data.map(() => true));
        setLoadEmployee(data.map(() => false));
        setLoadingAdmin(data.map(() => false));
        setLoadingReject(data.map(() => false));
      })
      .catch((err) => {
        setError(
          err.toString() + ". Please fix the error and refresh the page"
        );
      });
  }, []);

  // Sort ascending and descending
  const sorting = (col) => {
    if (order === "ASC") {
      dataUser.sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setOrder("DSC");
    } else {
      dataUser.sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setOrder("ASC");
    }
  };

  // Display specific number of rows
  const handleRowsChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value) || value < 1) {
      setRowsToShow(20);
    } else {
      setRowsToShow(value);
    }
  };

  // Add EMPLOYEE function
  const addEmployee = async (id, index) => {
    const newLoadEmployee = [...loadEmployee];
    newLoadEmployee[index] = true;
    setLoadEmployee(newLoadEmployee);

    try {
      const response = await addEmployeeApi(id);
      if (response.status === 200) {
        const newShowEmployeeButtons = [...showEmployeeButtons];
        newShowEmployeeButtons[index] = false;
        setShowEmployeeButtons(newShowEmployeeButtons);
        setModalMessage(response.message);
        setShowModal(true);
        dataUser.forEach((data) => {
          if (data.UserID === id) {
            data.roleID = 2;
          }
        });
      }
    } catch (err) {
      setModalMessage(err.toString());
      setShowModal(true);
    } finally {
      newLoadEmployee[index] = false;
      setLoadEmployee(newLoadEmployee);
    }
  };

  // Add ADMIN function
  const addAdmin = async (id, index) => {
    if (
      window.confirm(
        `Are you sure you want to add user with ID ${id} as an admin? This action cannot be undone.`
      )
    ) {
      const newLoadingAdmin = [...loadingAdmin];
      newLoadingAdmin[index] = true;
      setLoadingAdmin(newLoadingAdmin);

      try {
        const response = await addAdminApi(id);
        if (response.status === 200) {
          setModalMessage(response.message);
          setShowModal(true);
          setData((prevData) => prevData.filter((_, i) => i !== index));
        }
      } catch (err) {
        setModalMessage(err.toString());
        setShowModal(true);
      } finally {
        newLoadingAdmin[index] = false;
        setLoadingAdmin(newLoadingAdmin);
      }
    }
  };

  // REJECT function
  const handleReject = async (id, index) => {
    if (window.confirm(`Are you sure you want to delete user with ID ${id}?`)) {
      const newLoadingReject = [...loadingReject];
      newLoadingReject[index] = true;
      setLoadingReject(newLoadingReject);
      try {
        const response = await rejectApi(id);
        if (response.status === 200) {
          setModalMessage(response.message);
          setShowModal(true);
          setData((prevData) => prevData.filter((_, i) => i !== index));
        }
      } catch (err) {
        setModalMessage(err.toString());
        setShowModal(true);
      } finally {
        newLoadingReject[index] = false;
        setLoadingReject(newLoadingReject);
      }
    }
  };

  return (
    <>
      <div className="back" style={{ marginLeft: "50px", marginTop: "50px" }}>
        <div className={styles.heading} style={{ marginTop: "60px" }}>
          <div style={{ display: "flex" }}>
            <WavingHand />
            <h1 className="d-inline ms-2">Hello Admin,</h1>
          </div>
          <h5 className="ms-5 mb-4">
            On this page, you can manage email registrations by approving them
            as employees, designating them as admins, or rejecting them to
            maintain system security.
          </h5>
        </div>
        <div className="control-panel text-center justify-content-center">
          <div
            style={{
              width: "929px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              backgroundColor: "white",
              height: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#f7fafc",
                  height: "30px",
                  width: "220px",
                  alignContent: "center",
                }}
              >
                <label
                  style={{
                    marginRight: "5px",
                    marginLeft: "10px",
                    color: "gray",
                  }}
                >
                  Number of rows to display :
                </label>
              </div>
              <input
                placeholder="Number of rows"
                onChange={handleRowsChange}
                style={{
                  padding: "5px",
                  borderRadius: "4px",
                  width: "300px",
                  height: "20px",
                  border: 0,
                  borderLeft: "1px solid #ccc",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderLeft: "1px solid #ccc",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f7fafc",
                  height: "30px",
                  width: "100px",
                  alignContent: "center",
                }}
              >
                <label
                  style={{
                    marginRight: "5px",
                    marginLeft: "10px",
                    color: "gray",
                  }}
                >
                  Search :
                </label>
              </div>
              <input
                placeholder="Search Full Name or Email"
                onChange={(e) => setSearchDate(e.target.value)}
                style={{
                  padding: "5px",
                  borderRadius: "4px",
                  width: "300px",
                  height: "20px",
                  border: 0,
                  borderLeft: "1px solid #ccc",
                }}
              />
            </div>
          </div>
          {error ? (
            <div className="my-3 justify-content-center">
              <div className="mt-3 mb-0 w-50 text-center ms-3">{error}</div>
            </div>
          ) : !dataUser.length ? (
            <div className="d-flex justify-content-center flex-column align-items-center">
              <div>Loading...</div>
            </div>
          ) : (
            <div className="table-responsive-sm table-responsive-md">
              <table className={`${styles.customTable}`}>
                <caption className="fw-bolder">List of Users Accounts</caption>
                <thead className="table-info">
                  <tr>
                    <th
                      className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
                    >
                      ID
                    </th>
                    <th
                      className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
                    >
                      Full Name
                    </th>
                    <th
                      className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
                    >
                      Email
                    </th>
                    <th
                      className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
                    >
                      Role ID
                    </th>
                    <th
                      className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
                    >
                      Register Status
                    </th>
                    <th
                      className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
                      colSpan="3"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divide">
                  {dataUser
                    .slice(0, rowsToShow)
                    .filter((item) => {
                      return searchDate === ""
                        ? item
                        : item.FullName.toLowerCase().includes(
                            searchDate.toLowerCase()
                          ) ||
                            item.Email.toLowerCase().includes(
                              searchDate.toLowerCase()
                            );
                    })
                    .map((item, index) => (
                      <tr key={index}>
                        <td
                          className={`${styles.selectedCell} ${styles.tank} text-center`}
                        >
                          {item.UserID}
                        </td>
                        <td
                          className={`${styles.selectedCell} ${styles.tank} text-center`}
                        >
                          {item.FullName}
                        </td>
                        <td className={`${styles.selectedCell} text-center`}>
                          {item.Email}
                        </td>
                        <td className={`${styles.selectedCell} text-center`}>
                          {item.roleID}
                        </td>
                        <td className={`${styles.selectedCell} text-center`}>
                          {item.RegStatus}
                        </td>
                        <td className="me-0 pe-0 text-center">
                          {item.roleID
                            ? null
                            : showEmployeeButtons[index] && (
                                <Button
                                  variant="primary"
                                  disabled={loadEmployee[index]}
                                  className=" mx-0 my-2"
                                  onClick={() =>
                                    addEmployee(item.UserID, index)
                                  }
                                >
                                  {loadEmployee[index] ? (
                                    <>
                                      <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                      />
                                      Loading...
                                    </>
                                  ) : (
                                    "Add as Employee"
                                  )}
                                </Button>
                              )}
                        </td>
                        <td>
                          {item.roleID
                            ? null
                            : showEmployeeButtons[index] && (
                                <Button
                                  variant="success"
                                  disabled={loadingAdmin[index]}
                                  className=" mx-0 my-2"
                                  onClick={() => addAdmin(item.UserID, index)}
                                >
                                  {loadingAdmin[index] ? (
                                    <>
                                      <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                      />
                                      Loading...
                                    </>
                                  ) : (
                                    "Add as Admin"
                                  )}
                                </Button>
                              )}
                        </td>

                        <td>
                          <Button
                            variant="danger"
                            disabled={loadingReject[index]}
                            className=" mx-0 btn my-2"
                            onClick={() => handleReject(item.UserID, index)}
                          >
                            {loadingReject[index] ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                Loading...
                              </>
                            ) : (
                              "Reject"
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div show={showModal} onHide={() => setShowModal(false)}>
                <div>
                  <div>Message</div>
                  <div>{modalMessage}</div>
                </div>
                <button variant="primary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;

// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Spinner from "react-bootstrap/Spinner";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
// import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"; // Import the arrow icons

// import "../App.css";

// import {
//   getAllUsers,
//   addEmployeeApi,
//   addAdminApi,
//   rejectApi,
// } from "../api/users";
// import styles from "./admin.module.css";

// const WavingHand = () => {
//   return <div className={styles.hand}>👋</div>;
// };

// const Admin = () => {
//   const [dataUser, setData] = useState([]);
//   const [order, setOrder] = useState("ASC");
//   const [error, setError] = useState(null);
//   const [searchDate, setSearchDate] = useState("");
//   const [rowsToShow, setRowsToShow] = useState(20);

//   const [showEmployeeButtons, setShowEmployeeButtons] = useState([]);
//   const [loadEmployee, setLoadEmployee] = useState([]);
//   const [loadingAdmin, setLoadingAdmin] = useState([]);
//   const [loadingReject, setLoadingReject] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState([]);

//   useEffect(() => {
//     // Render all users when the admin page is refreshed
//     getAllUsers()
//       .then((data) => {
//         setData(data);
//         setShowEmployeeButtons(data.map(() => true));
//         setLoadEmployee(data.map(() => false));
//         setLoadingAdmin(data.map(() => false));
//         setLoadingReject(data.map(() => false));
//       })
//       .catch((err) => {
//         setError(
//           err.toString() + ". Please fix the error and refresh the page"
//         );
//       });
//   }, []);

//   // Sort ascending and descending
//   const sorting = (col) => {
//     if (order === "ASC") {
//       dataUser.sort((a, b) => (a[col] > b[col] ? 1 : -1));
//       setOrder("DSC");
//     } else {
//       dataUser.sort((a, b) => (a[col] < b[col] ? 1 : -1));
//       setOrder("ASC");
//     }
//     setData([...dataUser]); // Update state to trigger re-render
//   };

//   // Display specific number of rows
//   const handleRowsChange = (e) => {
//     const value = Number(e.target.value);
//     if (Number.isNaN(value) || value < 1) {
//       setRowsToShow(20);
//     } else {
//       setRowsToShow(value);
//     }
//   };

//   // Add EMPLOYEE function
//   const addEmployee = async (id, index) => {
//     const newLoadEmployee = [...loadEmployee];
//     newLoadEmployee[index] = true;
//     setLoadEmployee(newLoadEmployee);

//     try {
//       const response = await addEmployeeApi(id);
//       if (response.status === 200) {
//         const newShowEmployeeButtons = [...showEmployeeButtons];
//         newShowEmployeeButtons[index] = false;
//         setShowEmployeeButtons(newShowEmployeeButtons);
//         setModalMessage(response.message);
//         setShowModal(true);
//         dataUser.forEach((data) => {
//           if (data.UserID === id) {
//             data.roleID = 2;
//           }
//         });
//       }
//     } catch (err) {
//       setModalMessage(err.toString());
//       setShowModal(true);
//     } finally {
//       newLoadEmployee[index] = false;
//       setLoadEmployee(newLoadEmployee);
//     }
//   };

//   // Add ADMIN function
//   const addAdmin = async (id, index) => {
//     if (
//       window.confirm(
//         `Are you sure you want to add user with ID ${id} as an admin? This action cannot be undone.`
//       )
//     ) {
//       const newLoadingAdmin = [...loadingAdmin];
//       newLoadingAdmin[index] = true;
//       setLoadingAdmin(newLoadingAdmin);

//       try {
//         const response = await addAdminApi(id);
//         if (response.status === 200) {
//           setModalMessage(response.message);
//           setShowModal(true);
//           setData((prevData) => prevData.filter((_, i) => i !== index));
//         }
//       } catch (err) {
//         setModalMessage(err.toString());
//         setShowModal(true);
//       } finally {
//         newLoadingAdmin[index] = false;
//         setLoadingAdmin(newLoadingAdmin);
//       }
//     }
//   };

//   // REJECT function
//   const handleReject = async (id, index) => {
//     if (window.confirm(`Are you sure you want to delete user with ID ${id}?`)) {
//       const newLoadingReject = [...loadingReject];
//       newLoadingReject[index] = true;
//       setLoadingReject(newLoadingReject);
//       try {
//         const response = await rejectApi(id);
//         if (response.status === 200) {
//           setModalMessage(response.message);
//           setShowModal(true);
//           setData((prevData) => prevData.filter((_, i) => i !== index));
//         }
//       } catch (err) {
//         setModalMessage(err.toString());
//         setShowModal(true);
//       } finally {
//         newLoadingReject[index] = false;
//         setLoadingReject(newLoadingReject);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="back" style={{ marginLeft: "50px", marginTop: "50px" }}>
//         <div className={styles.heading} style={{ marginTop: "60px" }}>
//           <div style={{ display: "flex" }}>
//             <WavingHand />
//             <h1 className="d-inline ms-2">Hello Admin,</h1>
//           </div>
//           <h5 className="ms-5 mb-4">
//             On this page, you can manage email registrations by approving them
//             as employees, designating them as admins, or rejecting them to
//             maintain system security.
//           </h5>
//         </div>
//         <div className="control-panel text-center justify-content-center">
//           <div
//             style={{
//               width: "929px",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               padding: "10px",
//               backgroundColor: "white",
//               height: "10px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <div
//                 style={{
//                   backgroundColor: "#f7fafc",
//                   height: "30px",
//                   width: "220px",
//                   alignContent: "center",
//                 }}
//               >
//                 <label
//                   style={{
//                     marginRight: "5px",
//                     marginLeft: "10px",
//                     color: "gray",
//                   }}
//                 >
//                   Number of rows to display :
//                 </label>
//               </div>
//               <input
//                 placeholder="Number of rows"
//                 onChange={handleRowsChange}
//                 style={{
//                   padding: "5px",
//                   borderRadius: "4px",
//                   width: "300px",
//                   height: "20px",
//                   border: 0,
//                   borderLeft: "1px solid #ccc",
//                 }}
//               />
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 borderLeft: "1px solid #ccc",
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: "#f7fafc",
//                   height: "30px",
//                   width: "100px",
//                   alignContent: "center",
//                 }}
//               >
//                 <label
//                   style={{
//                     marginRight: "5px",
//                     marginLeft: "10px",
//                     color: "gray",
//                   }}
//                 >
//                   Search :
//                 </label>
//               </div>
//               <input
//                 placeholder="Search Full Name or Email"
//                 onChange={(e) => setSearchDate(e.target.value)}
//                 style={{
//                   padding: "5px",
//                   borderRadius: "4px",
//                   width: "300px",
//                   height: "20px",
//                   border: 0,
//                   borderLeft: "1px solid #ccc",
//                 }}
//               />
//             </div>
//           </div>
//           {error ? (
//             <div className="my-3 justify-content-center">
//               <div className="mt-3 mb-0 w-50 text-center ms-3">{error}</div>
//             </div>
//           ) : !dataUser.length ? (
//             <div className="d-flex justify-content-center flex-column align-items-center">
//               <div>Loading...</div>
//             </div>
//           ) : (
//             <div className="table-responsive-sm table-responsive-md">
//               <table className={`${styles.customTable}`}>
//                 <caption className="fw-bolder">List of User Accounts</caption>
//                 <thead className="table-info">
//                   <tr>
//                     <th
//                       className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
//                       onClick={() => sorting("id")}
//                     >
//                       ID
//                     </th>
//                     <th
//                       className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
//                       onClick={() => sorting("first_name")}
//                     >
//                       First Name
//                     </th>
//                     <th
//                       className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
//                       onClick={() => sorting("last_name")}
//                     >
//                       Last Name
//                     </th>
//                     <th
//                       className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
//                       onClick={() => sorting("email")}
//                     >
//                       Email
//                     </th>
//                     <th
//                       className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
//                       onClick={() => sorting("role_id")}
//                     >
//                       Role ID{" "}
//                       {order === "ASC" ? (
//                         <FontAwesomeIcon icon={faArrowUp} />
//                       ) : (
//                         <FontAwesomeIcon icon={faArrowDown} />
//                       )}
//                     </th>
//                     <th
//                       className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
//                     >
//                       Approve as Employee
//                     </th>
//                     <th
//                       className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
//                     >
//                       Approve as Admin
//                     </th>
//                     <th
//                       className={`${styles.headColor} ${styles.selected} ${styles.tableBack} text-center`}
//                     >
//                       Reject
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {dataUser
//                     .filter((user) => {
//                       const fullName = `${user.first_name} ${user.last_name}`;
//                       return (
//                         fullName
//                           .toLowerCase()
//                           .includes(searchDate.toLowerCase()) ||
//                         user.email
//                           .toLowerCase()
//                           .includes(searchDate.toLowerCase())
//                       );
//                     })
//                     .slice(0, rowsToShow)
//                     .map((user, index) => (
//                       <tr key={user.id}>
//                         <td className="text-center">{user.id}</td>
//                         <td className="text-center">{user.first_name}</td>
//                         <td className="text-center">{user.last_name}</td>
//                         <td className="text-center">{user.email}</td>
//                         <td className="text-center">{user.role_id}</td>
//                         <td className="text-center">
//                           {showEmployeeButtons[index] ? (
//                             <Button
//                               onClick={() => addEmployee(user.id, index)}
//                               variant="success"
//                               size="sm"
//                               disabled={loadEmployee[index]}
//                             >
//                               {loadEmployee[index] ? (
//                                 <Spinner
//                                   as="span"
//                                   animation="border"
//                                   size="sm"
//                                   role="status"
//                                   aria-hidden="true"
//                                 />
//                               ) : (
//                                 "Add Employee"
//                               )}
//                             </Button>
//                           ) : (
//                             <span>Added</span>
//                           )}
//                         </td>
//                         <td className="text-center">
//                           <Button
//                             onClick={() => addAdmin(user.id, index)}
//                             variant="info"
//                             size="sm"
//                             disabled={loadingAdmin[index]}
//                           >
//                             {loadingAdmin[index] ? (
//                               <Spinner
//                                 as="span"
//                                 animation="border"
//                                 size="sm"
//                                 role="status"
//                                 aria-hidden="true"
//                               />
//                             ) : (
//                               "Add Admin"
//                             )}
//                           </Button>
//                         </td>
//                         <td className="text-center">
//                           <Button
//                             onClick={() => handleReject(user.id, index)}
//                             variant="danger"
//                             size="sm"
//                             disabled={loadingReject[index]}
//                           >
//                             {loadingReject[index] ? (
//                               <Spinner
//                                 as="span"
//                                 animation="border"
//                                 size="sm"
//                                 role="status"
//                                 aria-hidden="true"
//                               />
//                             ) : (
//                               "Reject"
//                             )}
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Admin;
