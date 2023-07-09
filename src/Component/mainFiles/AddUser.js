import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postUserData, editData } from "../Slice/getUserSlice";
import store from "../Store/store";

const AddUser = ({
  id: initialId = "",
  name: initialName = "",
  salary: initialSalary = "",
}) => {
  const [id, setId] = useState(initialId);
  const [name, setName] = useState(initialName);
  const [salary, setSalary] = useState(initialSalary);
  const dispatch = useDispatch();
  store.subscribe((value) => {
    setId(store.getState()?.getUser?.selectedData.id || "");
    setName(store.getState()?.getUser?.selectedData.name || "");
    setSalary(store.getState()?.getUser.selectedData?.salary || "");
  });

  function handleSubmit(e) {
    e.preventDefault();
    const userObj = {
      id,
      name,
      salary,
    };
    if (id) {
      dispatch(editData(userObj));
    } else {
      dispatch(postUserData(userObj));
    }
    setId("");
    setName("");
    setSalary("");
  }

  return (
    <div>
      <h1 className="fw-bold">CRUD OPERATION</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-between align-items-end mb-3"
      >
        <div className="d-flex">
          <div className="form-group p-2">
            <label className="fw-bold">Name</label>
            <input
              type="text"
              className="form-control"
              id="nameinput"
              placeholder="Enter Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group p-2">
            <label className="fw-bold">Salary</label>
            <input
              type="number"
              className="form-control"
              id="salaryinput"
              placeholder="Enter Salary"
              required
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-success mb-2 fw-bold">
            {id ? "Update" : "+ Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
