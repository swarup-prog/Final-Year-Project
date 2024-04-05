import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUser = async () => {
    try {
      const response = await axios.get("/user/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toastError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="text-xl text-accent font-semibold">Users</div>
      </section>
      <div className="divider divider-accent"></div>
      <div className="overflow-x-auto mx-5">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr className="hover" key={index}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div className="flex gap-2">
                    <span className="btn btn-accent text-primary btn-sm">
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
