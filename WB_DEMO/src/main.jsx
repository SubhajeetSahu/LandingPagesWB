
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginUser from "./components/Login/LoginUser.jsx";
import HomePage1 from "./components/HomePages/HomePage1.jsx";
import HomePage2 from "./components/HomePages/HomePage2.jsx";
import HomePage3 from "./components/HomePages/HomePage3.jsx";
import HomePage4 from "./components/HomePages/HomePage4.jsx";
import HomePage5 from "./components/HomePages/HomePage5.jsx";
import HomePage6 from "./components/HomePages/HomePage6.jsx";

import CreateUser from "./components/Admin/CreateUser/CreateUser.jsx";
import ManageUser from "./components/Admin/ManageUser/ManageUser.jsx";
import UpdateUser from "./components/Admin/UpdateUser/UpdateUser.jsx";
import ResetPassword from "./components/Admin/ResetPassword/ResetPassword.jsx";
import CompanyManagement from "./components/Admin/CompanyManagement/CompanyManagement.jsx";
import SiteManagement from "./components/Admin/SiteManagement/SiteManagement.jsx";
import Vehicle from "./components/Admin/Vehicle/Vehicle.jsx";
import Transporter from "./components/Admin/Transporter/Transporter.jsx";
import Customer from "./components/Admin/Customer/Customer.jsx";
import Supplier from "./components/Admin/Supplier/Supplier.jsx";
import ViewCompany from "./components/Admin/ViewCompany/ViewCompany.jsx";
import ViewSupplier from "./components/Admin/ViewSupplier/ViewSupplier.jsx";
import ViewVehicle from "./components/Admin/ViewVehicle/ViewVehicle.jsx";
import ViewCustomer from "./components/Admin/ViewCustomer/ViewCustomer.jsx";
import MaterialManagement from "./components/Admin/MaterialManagement/MaterialManagement.jsx";
import RoleManagement from "./components/Admin/RoleManagement/RoleManagement.jsx";
import ViewTransporter from "./components/Admin/ViewTranporter/ViewTransporter.jsx";



import VehicleEntry from "./components/GateUser/src/components/Vehicle_Entry/VehicleEntry.jsx";
import VehicleEntryDetails from "./components/GateUser/src/components/Vehicle_Entry/VehicleEntryDetails.jsx";
import VehicleOutboundDetails from "./components/GateUser/src/components/Vehicle_Entry/VehicleOutboundDetails.jsx";
import SalesDetails from "./components/GateUser/src/components/Vehicle_Entry/SalesDetails.jsx";
import Report from "./components/GateUser/src/components/Report/Report.jsx";
import Print from "./components/GateUser/src/components/Print/Print.jsx";
import Camera from "./components/GateUser/src/components/Camera/Camera.jsx";
import Capture from "./components/GateUser/src/components/Camera/Capture.jsx";

import QualityCheck from "./components/QualityCheck/src/components/QualityCheck/QualityCheck.jsx";
import QualityInboundDashboard from "./components/QualityCheck/src/components/QualityCheck/QualityInboundDashboard.jsx";
import QualityOutboundDashboard from "./components/QualityCheck/src/components/QualityCheck/QualityOutboundDashboard.jsx"
import QPrint from "./components/QualityCheck/src/components/Print/Print.jsx";
import QReport from "./components/QualityCheck/src/components/Report/QReport.jsx";
import QualityOutboundDetails from "./components/QualityCheck/src/components/QualityCheck/QualityOutboundDetails.jsx";
import QualityInboundIronOreDetails from "./components/QualityCheck/src/components/QualityCheck/QualityInboundIronOreDetails.jsx";
import QualityInboundCoalDetails from "./components/QualityCheck/src/components/QualityCheck/QualityInboundCoalDetails.jsx";
import QualityHomePage from "./components/QualityCheck/src/components/QHome/QualityHomePage.jsx";
import QualityOutboundSpongeIronDetails from "./components/QualityCheck/src/components/QualityCheck/QualityOutboundSpongeIronDetails.jsx";

import ManagementHome from "./components/Management/src/components/Home/ManagementHome.jsx";
import ManagementLocation from "./components/Management/src/components/Location/Location.jsx";
import ManagementTransaction from "./components/Management/src/components/Transaction/Transaction.jsx";
import ManagementCamera from "./components/Management/src/components/Camera/Camera.jsx";
import ManagementReport from "./components/Management/src/components/Report/Report.jsx";

import OperatorHome from "./components/Operator/src/components/homed/Homed.jsx";
import OperatorTransaction from "./components/Operator/src/components/transaction/Transaction.jsx";
import OperatorReport from "./components/Operator/src/components/report/Report.jsx";
import OperatorTransactionFromInbound from "./components/Operator/src/components/transactionform/TransactionFrom.jsx";
import OperatorTransactionFromOutbound from "./components/Operator/src/components/transactionform1/Transactionform1.jsx";

import SalesOrder from "./components/Sales/SalesOrder/SalesOrder.jsx";
import ProcessOrder from "./components/Sales/ProcessOrder/ProcessOrder.jsx";
import SideBar6 from "./components/SideBar/Sidebar6.jsx";
import SalesDisplay from "./components/Sales/SalesDisplay/SalesDisplay.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginUser />} />
      <Route path="/home1" element={<HomePage1 />} />
      <Route path="/home2" element={<HomePage2 />} />
      <Route path="/home3" element={<HomePage3 />} />
      <Route path="/home4" element={<HomePage4 />} />
      <Route path="/home5" element={<HomePage5 />} />
      <Route path="/home6" element={<HomePage6 />} />

      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/manage-user" element={<ManageUser />} />
      <Route path="/update-user" element={<UpdateUser />} />
      <Route path="/company-management" element={<CompanyManagement />} />
      <Route path="/site-management" element={<SiteManagement />} />
      <Route path="/vehicle" element={<Vehicle />} />
      <Route path="/transporter" element={<Transporter />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/Customer" element={<Customer />} />
      <Route path="/Supplier" element={<Supplier />} />
      <Route path="/view-company" element={<ViewCompany />} />
      <Route path="/view-supplier" element={<ViewSupplier />} />
      <Route path="/view-vehicle" element={<ViewVehicle />} />
      <Route path="/view-customer" element={<ViewCustomer />} />
      <Route path="/view-transporter" element={<ViewTransporter />} />
      <Route path="/material-management" element={<MaterialManagement />} />
      <Route path="/role-management" element={<RoleManagement />} />

      <Route path="/VehicleEntry" element={<VehicleEntry />} />
      <Route path="/VehicleEntryDetails" element={<VehicleEntryDetails />} />
      <Route path="/VehicleEntry-Outbound" element={<VehicleOutboundDetails />} />
      <Route path="/Sales-Details" element={<SalesDetails />} />
      <Route path="/reports" element={<Report />} />
      <Route path="/Print" element={<Print />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/Capture" element={<Capture />} />

      <Route path="/QualityHomePage" element={<QualityHomePage />} />
      <Route path="/QualityCheck" element={<QualityCheck />} />
      <Route path="/QPrint" element={<QPrint />} />
      <Route path="/QReport" element={<QReport />} />
      <Route path="/QualityOutboundDetails" element={<QualityOutboundDetails />} />
      <Route path="/QualityInboundDashboard" element={<QualityInboundDashboard />} />
      <Route path="/QualityOutboundDashboard" element={<QualityOutboundDashboard />} />
      <Route path="/QualityInboundIronOreDetails" element={<QualityInboundIronOreDetails />} />
      <Route path="/QualityInboundCoalDetails" element={<QualityInboundCoalDetails />} />
      <Route path="/QualityOutboundSpongeIronDetails" element={<QualityOutboundSpongeIronDetails />} />

      <Route path="/ManagementHome" element={<ManagementHome />} />
      <Route path="/ManagementLocation" element={<ManagementLocation />} />
      <Route path="/ManagementTransaction" element={<ManagementTransaction />} />
      <Route path="/ManagementCamera" element={<ManagementCamera />} />
      <Route path="/ManagementReport" element={<ManagementReport />} />

      <Route path="/OperatorHome" element={<OperatorHome />} />
      <Route path="/OperatorTransaction" element={<OperatorTransaction />} />
      <Route path="/OperatorReport" element={<OperatorReport />} />
      <Route path="/OperatorTransactionFromInbound" element={<OperatorTransactionFromInbound />} />
      <Route path="/OperatorTransactionFromOutbound" element={<OperatorTransactionFromOutbound />} />

      <Route path="/SalesOrder" element={<SalesOrder />} />
      <Route path="/ProcessOrder" element={<ProcessOrder />} />
      <Route path="/Sidebar6" element={<SideBar6 />} />
      <Route path="/SalesDisplay" element={<SalesDisplay />}/>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
