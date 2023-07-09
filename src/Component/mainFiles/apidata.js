import React, { useEffect, useState } from "react";
import { fetchUserData, removeData, setSelectedData } from "../Slice/getUserSlice";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

export default function ApiData(props) {
  // ACTIONS 
  const disptach = useDispatch();
  const state = useSelector((state) => state);
  const userList = useSelector((state) => state?.getUser?.data);

  useEffect((data) => {
    if (!state.getuser?.data?.length) {
      disptach(fetchUserData());
    }
  }, []);

  // DELETE DATA 
  const handelDelete =(index) =>{
    if(window.confirm("Are you sure you want to delete")){
      disptach(removeData(index));
    }
  };

  // EDIT DATA 
  const handleEdit = (index, name, salary) => {
    const updatedUser = {
      id: index,
      name: name,
      salary: salary,
    };
    disptach(setSelectedData(updatedUser));
  };
  

  return (
    <table class="table table-bordered">
      <thead>
        <tr>
          <th className="text-light bg-dark" scope="col">
            ID
          </th>
          <th className="text-light bg-dark" scope="col">
            Name
          </th>
          <th className="text-light bg-dark" scope="col">
            Salary
          </th>
          <th className="text-light bg-dark" scope="col">
            Functions
          </th>
        </tr>
      </thead>
      <tbody>
        <th scope="row"></th>
        {userList?.map((data, index) => {
          return (
            <>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.salary}</td>
                <td className="w-25 align-items-center">
                  <i onClick={() => (handelDelete(data?.id))} role="button" class="fa-sharp fa-solid fa-trash ms-2"></i>
                  <i onClick={() => (handleEdit(data.id, data.name, data.salary))} role="button" class="fa-solid fa-pen-to-square ms-3"></i>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}
