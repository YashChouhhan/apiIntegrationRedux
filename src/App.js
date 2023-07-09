import React, { useEffect } from "react";
// import "./App.css";
import ApiData from "./Component/mainFiles/apidata";
import 'bootstrap/dist/css/bootstrap.css';
import AddUser from "./Component/mainFiles/AddUser";

function App() {
  useEffect(()=>{

  })
  return (
    <div className="App container mt-5">
      <header className="App-header">
        <AddUser/>
        <ApiData/>
      </header>
    </div>
    // testtingggskljfsdlfj
  );
} 

export default App;
