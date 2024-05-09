import React, { useState } from "react";
import "./transactionform.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import camView from "../../assets/weighbridge.webp";

import SideBar5 from "../../../../SideBar/SideBar5";

const OperatorTransactionFromInbound = () => {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const [inputValue, setInputValue] = useState(0);
  const [grossWeight, setGrossWeight] = useState();
  const [tareWeight, setTareWeight] = useState();
  const [netWeight, setNetWeight] = useState();
  const [isTareWeightEnabled, setIsTareWeightEnabled] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSave = () => {
    if (!isTareWeightEnabled) {
      setGrossWeight(inputValue);
      setInputValue(); 
      setIsTareWeightEnabled(true);
    } else {
      setTareWeight(inputValue);
      var netWeightValue = grossWeight - inputValue;
      setNetWeight(netWeightValue);
      console.log("Net Weight:", netWeightValue);
    }
    
  };
  const handleClear = () => {
  setGrossWeight(0); 
  setTareWeight(0);
  setNetWeight(0);
  setInputValue(0);
    
   };

   const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const navigate = useNavigate();

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  function getFormattedTime() {
    const date = new Date();
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  // const closeForm = () => {
  //   navigate("/transaction");
  // };

  return (
    <div className=" trans_form_main_div overflow-hidden">
      

<SideBar5
  isSidebarExpanded={isSidebarExpanded}
  toggleSidebar={toggleSidebar}
/>
      {/* <div className="close" onClick={closeForm}>
        <FontAwesomeIcon icon={faRectangleXmark} />
      </div> */}
      <div className="main-content">
      <h1> Inbound Transaction Form </h1>
      <div className="row">
        <div className="col-5 ">
          <label htmlFor="trDate">Date:-</label>
          <input
            type="date"
            id="trDate"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            readOnly
          />

          <br/>
          <br/>

          <input
            className="display_weight"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            oninput="reflectInput(this.value, 'grossWeight')"
            // disabled={isTareWeightEnabled}
          />

          <br />
          <br />

          <div className="div1 ">
            <label htmlFor="userId" className="text1">
              Gross Wt:
            </label>

            <input
              type="text"
              autoComplete="off"
              value={grossWeight}
              readOnly
            />
            <input
              type="date"
              value={currentDate}
              onChange={ (e) => setCurrentDate(e.target.value)}
              readOnly
            />

            <input
              type="time"
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              readOnly
            />
            <br />

            <label htmlFor="userId" className="text1">
              Tare Wt:
            </label>

            <input
              type="text"
              autoComplete="off"
              value={tareWeight}
              required={isTareWeightEnabled}
              readOnly
            />
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              readOnly
            />

            <input
              type="time"
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              readOnly
            />
            <br />

            <label htmlFor="userId" className="text1">
              Net Wt:
            </label>

            <input
              type="text"
              autoComplete="off"
              value={netWeight}
              required={isTareWeightEnabled}
              readOnly
            />

            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              readOnly
            />

            <input
              type="time"
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              readOnly
            />
          </div>

          <div className="div2">
            <label htmlFor="userId" className="text1">
              Supplier:
            </label>

            <input type="text" autoComplete="off" value="" readOnly />
            <br />

            <label htmlFor="userId" className="text1">
              Supplier Address:
            </label>

            <input type="text" autoComplete="off" value="" readOnly />
            <br />

            <label htmlFor="userId" className="text1">
              Transporter:
            </label>

            <input
              type="text"
              autoComplete="off"
              value=""
              readOnly
            />
            <br />

            <label htmlFor="userId" className="text1">
              Driver DL no:
            </label>

            <input
              type="text"
              autoComplete="off"
              value=""
              readOnly
            />
            <br />

            <label htmlFor="userId" className="text1">
              Driver Name:
            </label>

            <input type="text" autoComplete="off" value="" readOnly />
            <br />

            <label htmlFor="userId" className="text1">
              Department:
            </label>

            <input type="text" autoComplete="off" value="" readOnly />
            <br />

            <label htmlFor="userId" className="text1">
              Material:
            </label>

            <input type="text" autoComplete="off" value=" " readOnly />
          </div>
          <br />
        </div>
        <div className="col-6 ">
          <div className="row">
            <div className="col-5">
            <div className="input-container">
              <label htmlFor="userId">
                Truck No:
              </label>

              <input type="text" autoComplete="off" readOnly />
              <br />
            </div>
            <div className="input-container">
              <label htmlFor="userId">
                PO No:
              </label>

              <input type="text" autoComplete="off" readOnly />
              <br />
            </div>
            <div className="input-container">
              <label htmlFor="userId" >
                TP No:
              </label>

              <input type="text" autoComplete="off" readOnly/>
              <br />
              </div>
              <div className="input-container">
              <label htmlFor="userId"  >
                Challan No:
              </label>

              <input type="text" autoComplete="off" readOnly />
              <br />
            </div>
            </div>

            <div className="col-2">
              <button
                className="btn btn-primary"
                onClick={handleSave}
                style={{ marginBottom: "5px" }}
              >
                Save[F10]
              </button>
              <button
                className="btn btn-primary"
                onClick={handleClear}
                style={{ marginBottom: "5px" }}
              >
                Clear[F9]
              </button>
              <button
                className="btn btn-primary"
                style={{ marginBottom: "5px" }}
              >
                Print
              </button>
            </div>
            <br></br>
            <div className="row">
              <div class="text-center camview">
                <div className="camera">
                  <b>Camera</b>
                </div>
                <div class="row">
                  <div class="col">
                    <img src={camView} alt="CamView" className="style" />
                    <br />
                    <button class="btn btn-success ">Capture</button>
                  </div>
                  <div class="col">
                    <img src={camView} alt="CamView" className="style" />
                    <br />
                    <button class="btn btn-success ">Capture</button>
                  </div>
                  <div class="col">
                    <img src={camView} alt="CamView" className="style" />
                    <br />
                    <button class="btn btn-success">Capture</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div>
        <label htmlFor="userId" className="text3">
          Status:Inbound
        </label>
      </div>
    </div>
  );
};
export default OperatorTransactionFromInbound;
