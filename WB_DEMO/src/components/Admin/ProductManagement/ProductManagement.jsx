import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./ProductManagement.css";
import SideBar from "../../SideBar/SideBar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEraser } from "@fortawesome/free-solid-svg-icons";

function ProductManagement() {
  const [productName, setproductName] = useState("");
  const [productTypeName, setproductTypeName] = useState("");
  const [productNames, setproductNames] = useState([]);
  const [productTypeNames, setproductTypeNames] = useState([]);
  const [error, setError] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [userInputName, setUserInputName] = useState("");
  const [userInputType, setUserInputType] = useState("");
  const [parameters, setParameters] = useState([
    { parameterName: "", rangeFrom: "", rangeTo: "" },
  ]);

  useEffect(() => {
    fetchproductNames();
  }, []);

  const fetchproductNames = () => {
    fetch("http://localhost:8080/api/v1/products/names")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch product names.");
        }
      })
      .then((data) => {
        setproductNames(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      });
  };

  const fetchproductTypeNames = (name) => {
    fetch(`http://localhost:8080/api/v1/products/${name}/types`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch product types.");
        }
      })
      .then((data) => {
        setproductTypeNames(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      });
  };

  const handleClear = () => {
    setproductName("");
    setproductTypeName("");
    setproductTypeNames([]); // Reset productTypeNames state
    setShowNameInput(false);
    setShowTypeInput(false);
    setUserInputName("");
    setUserInputType("");
    setParameters([{ parameterName: "", rangeFrom: "", rangeTo: "" }]);
  };

  const handleSave = () => {
    let finalproductName = productName;
    let finalproductTypeName;

    if (showNameInput && userInputName.trim() !== "") {
      finalproductName = userInputName.trim();
    } else if (
      productName.trim() === "" ||
      parameters.some(
        (param) =>
          param.parameterName.trim() === "" ||
          param.rangeFrom.trim() === "" ||
          param.rangeTo.trim() === ""
      )
    ) {
      Swal.fire({
        title: "Please fill in all the required fields.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    if (showTypeInput && userInputType.trim() !== "") {
      finalproductTypeName = userInputType.trim();
    } else if (!showTypeInput && productTypeName.trim() !== "") {
      finalproductTypeName = productTypeName.trim();
    }

    const productData = {
      productName: finalproductName,
      productTypeName: finalproductTypeName,
      parameters: parameters.map((param) => ({
        parameterName: param.parameterName.trim(),
        rangeFrom: parseFloat(param.rangeFrom.trim()),
        rangeTo: parseFloat(param.rangeTo.trim()),
      })),
    };

    fetch("http://localhost:8080/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.ok) {
          return response.text();
        } else {
          const error = await response.json();
          throw new Error(error.message);
        }
      })
      .then((data) => {
        console.log("Response from the API:", data);
        Swal.fire({
          title: data,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then(() => {
          handleClear();
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      });
  };
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setproductName(value);
    setShowNameInput(value === "add a product");
    if (value !== "add a product") {
      fetchproductTypeNames(value);
    } else {
      setproductTypeNames([]); // Reset productTypeNames state
      setproductTypeName(""); // Reset productTypeName state
    }
  };

  const handleTypeSelectChange = (event) => {
    const { value } = event.target;
    setproductTypeName(value);
    setShowTypeInput(value === "add a type");
  };

  const handleNameInputChange = (event) => {
    setUserInputName(event.target.value);
  };

  const handleTypeInputChange = (event) => {
    setUserInputType(event.target.value);
    setproductTypeName(event.target.value);
  };

  const handleParameterChange = (index, event) => {
    const { name, value } = event.target;
    const updatedParameters = [...parameters];
    updatedParameters[index][name] = value;
    setParameters(updatedParameters);
  };

  const handleAddParameter = () => {
    setParameters([
      ...parameters,
      { parameterName: "", rangeFrom: "", rangeTo: "" },
    ]);
  };

  const handleRemoveParameter = (index) => {
    const updatedParameters = [...parameters];
    updatedParameters.splice(index, 1);
    setParameters(updatedParameters);
  };

  return (
    <SideBar>
      <div className="product-management">
        <div className="product-management-main-content container-fluid">
          <h2 className="text-center">Product Management</h2>
          <div className="product-card-container">
            <div className="card-body p-4 shadow-lg">
              <form>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="productName" className="form-label">
                      Product Name{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    {showNameInput ? (
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={userInputName}
                        onChange={handleNameInputChange}
                        required
                        placeholder="Enter product name"
                        autoFocus
                      />
                    ) : (
                      <select
                        className="form-select"
                        id="productName"
                        value={productName}
                        onChange={handleSelectChange}
                        required
                      >
                        <option value="">Select product Name</option>
                        {productNames.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                        <option value="add a product">Add product</option>
                      </select>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="productTypeName" className="form-label">
                      Product Type{" "}
                    </label>
                    {showTypeInput ? (
                      <input
                        type="text"
                        className="form-control"
                        id="productTypeName"
                        value={userInputType}
                        onChange={handleTypeInputChange}
                        autoFocus
                        placeholder="Enter product Type"
                      />
                    ) : (
                      <div>
                        {productTypeNames.length > 0 ? (
                          <select
                            className="form-select"
                            id="productTypeName"
                            value={productTypeName}
                            onChange={handleTypeSelectChange}
                          >
                            <option value="">Select product Type</option>
                            {productTypeNames.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                            <option value="add a type">Add Type</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            id="productTypeName"
                            value={userInputType}
                            onChange={handleTypeInputChange}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {parameters.map((parameter, index) => (
                  <div className="row mb-2" key={index}>
                    <div className="col-md-4">
                      <label
                        htmlFor={`parameterName${index}`}
                        className="form-label"
                      >
                        Parameter Name{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`parameterName${index}`}
                        name="parameterName"
                        value={parameter.parameterName}
                        onChange={(e) => handleParameterChange(index, e)}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlFor={`rangeFrom${index}`}
                        className="form-label"
                      >
                        Min{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id={`rangeFrom${index}`}
                        name="rangeFrom"
                        value={parameter.rangeFrom}
                        onChange={(e) => handleParameterChange(index, e)}
                        required
                        min={0}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor={`rangeTo${index}`} className="form-label">
                        Max{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id={`rangeTo${index}`}
                        name="rangeTo"
                        value={parameter.rangeTo}
                        onChange={(e) => handleParameterChange(index, e)}
                        required
                        min={0}
                      />
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                      {index > 0 && (
                        <RemoveIcon
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleRemoveParameter(index)}
                        />
                      )}
                      <AddIcon
                        style={{
                          cursor: "pointer",
                          marginLeft: "0.5rem",
                          color: "green",
                        }}
                        onClick={handleAddParameter}
                      />
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-end mt-3">
                  <button
                    type="button"
                    className="btn btn-danger me-4 btn-hover"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #cccccc",
                      width: "100px",
                    }}
                    onClick={handleClear}
                  >
                    <FontAwesomeIcon icon={faEraser} className="me-1" />
                    Clear
                  </button>
                  <button
                    type="button"
                    className="btn btn-success-1 btn-hover"
                    style={{
                      backgroundColor: "white",
                      color: "black",

                      width: "100px",
                      border: "1px solid #cccccc",
                    }}
                    onClick={handleSave}
                  >
                    <FontAwesomeIcon icon={faSave} className="me-1" />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default ProductManagement;
