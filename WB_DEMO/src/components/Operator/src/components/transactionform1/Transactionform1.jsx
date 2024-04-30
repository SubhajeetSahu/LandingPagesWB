// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./transactionform1.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import camView from "../../assets/weighbridge.webp";
import Header from "../../../../Admin/Header/Header";
import SideBar5 from "../../../../SideBar/SideBar5";

const OperatorTransactionFromOutbound = () => {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const [inputValue, setInputValue] = useState(0);
  const [grossWeight, setGrossWeight] = useState();
  const [tareWeight, setTareWeight] = useState();
  const [netWeight, setNetWeight] = useState();
  const [isGrossWeightEnabled, setIsGrossWeightEnabled] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
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

  const handleSave = () => {
    if (!isGrossWeightEnabled) {
      setTareWeight(inputValue);
      setInputValue();
      setIsGrossWeightEnabled(true);
    } else {
      setGrossWeight(inputValue);
      var netWeightValue = inputValue - tareWeight;
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

  const closeForm = () => {
    navigate("/transaction");
  };
  return (
    <div className=" trans_form_main_div overflow-hidden">
      <Header toggleSidebar={toggleSidebar} />

      <SideBar5
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="main-content">
        {/* <div className="close" onClick={closeForm}>
          <FontAwesomeIcon icon={faRectangleXmark} />
        </div> */}

        <h1> Outbound Transaction Form </h1>
        <div className="row">
          <div className="col-lg-4 container-fluid">
            <label htmlFor="trDate">Date:-</label>
            <input
              type="date"
              id="trDate"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              readOnly
            />
            <br />
            <br />
            <input
              className="display_weight"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <br />
            <br />

            <div className="div1">
              <label htmlFor="userId" className="text1">
                Gross Wt:
              </label>

              <input
                type="text"
                autoComplete="off"
                value={grossWeight}
                // onChange={(e) => setGrossWeight(e.target.value)}

                required={isGrossWeightEnabled}
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
                Tare Wt:
              </label>

              <input
                type="text"
                autoComplete="off"
                value={tareWeight}
                // onChange={(e) => setTareWeight(e.target.value)}
                required
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
                required={isGrossWeightEnabled}
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
                Customer:
              </label>

              <input type="text" autoComplete="off" value="" readOnly />
              <br />

              <label htmlFor="userId" className="text1">
                Customer Address:
              </label>

              <input type="text" autoComplete="off" value="" readOnly />
              <br />

              <label htmlFor="userId" className="text1">
                Transporter:
              </label>

              <input type="text" autoComplete="off" value="" readOnly />
              <br />

              <label htmlFor="userId" className="text1">
                Driver DL no:
              </label>

              <input type="text" autoComplete="off" value="" readOnly />
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
                Product:
              </label>

              <input type="text" autoComplete="off" value="" readOnly />
            </div>
            <br />
          </div>
          <div className="col-lg-4 div3 container-fluid">
            <label htmlFor="userId" className="text1">
              Truck No:
            </label>

            <input type="text" autoComplete="off" readOnly />
            <br />

            <label htmlFor="userId" className="text1">
              PO No:
            </label>

            <input type="text" autoComplete="off" readOnly />
            <br />

            <label htmlFor="userId" className="text1">
              TP No:
            </label>

            <input type="text" autoComplete="off" readOnly />
            <br />

            <label htmlFor="userId" className="text1">
              Challan No:
            </label>

            <input type="text" autoComplete="off" readOnly />
            <br />

            <br />
            <table className="text-center camview">
              <tr>
                <td colSpan="5">
                  <b>Camera</b>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={camView} alt="CamView" width={200} height={200} />
                  <br />
                  <button className="btn btn-success w-100">Capture</button>
                </td>

                <td>
                  <img src={camView} alt="CamView" width={200} height={200} />
                  <br />
                  <button className="btn btn-success w-100">Capture</button>
                </td>

                <td>
                  <img src={camView} alt="CamView" width={200} height={200} />
                  <br />
                  <button className="btn btn-success w-100">Capture</button>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-lg-2 container-fluid">
            <div className="right_div">
              <button className="btn btn-primary" onClick={handleSave}>
                Save[F10]
              </button>
              <button className="btn btn-primary" onClick={handleClear}>
                Clear[F9]
              </button>
              <button className="btn btn-primary">Print</button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="userId" className="text1">
            Status: Outbound
          </label>
        </div>
      </div>
    </div>
  );
};

export default OperatorTransactionFromOutbound;
