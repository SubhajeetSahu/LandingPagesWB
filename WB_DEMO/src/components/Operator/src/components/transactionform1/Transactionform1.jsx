import React, { useState, useEffect, useRef } from "react";
import "./transactionform1.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import camView from "../../assets/weighbridge.webp";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../../../../Header/Header";
import SideBar5 from "../../../../SideBar/SideBar5";

const OperatorTransactionFromOutbound = () => {

  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [grossWeight, setGrossWeight] = useState('');
  const [tareWeight, setTareWeight] = useState('');
  const [isGrossWeightEnabled, setIsGrossWeightEnabled] = useState(false);
  const navigate = useNavigate();

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const handleSave = () => {
    // Enable gross weight and calculate net weight on save
    setIsGrossWeightEnabled(true);
    const netWeight = grossWeight - tareWeight;
    console.log("Net Weight:", netWeight);
    // You can perform other save operations here
  };

  const closeForm = () => {
    navigate("/transaction");
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);
 
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
 
  useEffect(() => {
    Chart.register(ArcElement);
 
    const resizeObserver = new ResizeObserver(() => {
      if (
        homeMainContentRef.current &&
        chartRef.current?.chartInstance &&
        chartRef2.current?.chartInstance
      ) {
        chartRef.current.chartInstance.resize();
        chartRef2.current.chartInstance.resize();
      }
    });
 
    if (homeMainContentRef.current) {
      resizeObserver.observe(homeMainContentRef.current);
    }
 
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

<SideBar5
  isSidebarExpanded={isSidebarExpanded}
  toggleSidebar={toggleSidebar}
/>
    <div className=" trans_form_main_div1 overflow-hidden">
      <div className="close" onClick={closeForm}>
        <FontAwesomeIcon icon={faRectangleXmark} />
      </div>
    

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
          <input className="display_weight" value={tareWeight} onChange={(e) => setTareWeight(parseFloat(e.target.value))} required />
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
              onChange={(e) => setGrossWeight(e.target.value)}
              disabled={!isGrossWeightEnabled}
              required
            />

            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              readOnly
            />

            <input type="text" autoComplete="off" required />
            <br />

            <label htmlFor="userId" className="text1">
              Tare Wt:
            </label>

            <input
              type="text"
              autoComplete="off"
              value={tareWeight}
              onChange={(e) => setTareWeight(e.target.value)}
              required
            />

            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              readOnly
            />

            <input type="text" autoComplete="off" required />
            <br />

            <label htmlFor="userId" className="text1">
              Net Wt:
            </label>

            <input
              type="text"
              autoComplete="off"
              value={grossWeight - tareWeight}
              disabled
              required
            />

            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              readOnly
            />

            <input type="text" autoComplete="off" required />
          </div>

          <div className="div2">
            <label htmlFor="userId" className="text1">
              Customer:
            </label>

            <input
              type="text"
              autoComplete="off"
              value="Vikram Pvt. Ltd."
              required
            />
            <br />

            <label htmlFor="userId" className="text1">
              Customer Address:
            </label>

            <input type="text" autoComplete="off" value="" required />
            <br />

           

            <label htmlFor="userId" className="text1">
              Transporter:
            </label>

            <input
              type="text"
              autoComplete="off"
              value="Jagannath Travels"
              required
            />
            <br />

            <label htmlFor="userId" className="text1">
              Driver DL no:
            </label>

            <input
              type="text"
              autoComplete="off"
              value="OD-0420130183087"
              required
            />
            <br />

            <label htmlFor="userId" className="text1">
              Driver Name:
            </label>

            <input type="text" autoComplete="off" value="Mohan Lal" required />
            <br />

            <label htmlFor="userId" className="text1">
              Department:
            </label>

            <input type="text" autoComplete="off" value="Store" required />
            <br />

            <label htmlFor="userId" className="text1">
              Product:
            </label>

            <input type="text" autoComplete="off" value="Coal" required />
          </div>
          <br />
        </div>
        <div className="col-lg-4 div3 container-fluid">
          <label htmlFor="userId" className="text1">
          Truck No:
          </label>

          <input type="text" autoComplete="off" required />
          <br />

          <label htmlFor="userId" className="text1">
            PO No:
          </label>

          <input type="text" autoComplete="off" required />
          <br />

          <label htmlFor="userId" className="text1">
            TP No:
          </label>

          <input type="text" autoComplete="off" required />
          <br />

          <label htmlFor="userId" className="text1">
            Challan No:
          </label>

          <input type="text" autoComplete="off" required />
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
                <br/>
                <button className="btn btn-success w-100">Capture</button>
              </td>
           
              <td>
                <img src={camView} alt="CamView" width={200} height={200} />
                <br/>
                <button className="btn btn-success w-100">Capture</button>
              </td>
           
              <td>
                <img src={camView} alt="CamView" width={200} height={200} />
                <br/>
                <button className="btn btn-success w-100">Capture</button>
              </td>
            </tr>
          </table>
        </div>
        <div className="col-lg-2 container-fluid">
          <div className="right_div">
            <button className="btn btn-primary" onClick={handleSave}>Save[F10]</button>
            <button className="btn btn-primary">Clear[F9]</button>
            <button className="btn btn-primary">Print</button>
          </div>
        </div>
      </div>
      <div>
        {/* <label htmlFor="userId" className="text1">
          Status: Outbound
        </label> */}
      </div>
    </div>
    </div>
  );
};

export default OperatorTransactionFromOutbound;
