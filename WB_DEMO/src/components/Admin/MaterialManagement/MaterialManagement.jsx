import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./MaterialManagement.css";
import SideBar from "../../SideBar/SideBar";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function MaterialManagement() {
  const [materialName, setMaterialName] = useState("");
  const [materialTypeName, setMaterialTypeName] = useState("");
  const [materialNames, setMaterialNames] = useState([]);
  const [materialTypeNames, setMaterialTypeNames] = useState([]);
  const [error, setError] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [userInputName, setUserInputName] = useState("");
  const [userInputType, setUserInputType] = useState("");
  const [parameters, setParameters] = useState([{ parameterName: "", rangeFrom: "", rangeTo: "" }]);

  useEffect(() => {
    fetchMaterialNames();
  }, []);

  const fetchMaterialNames = () => {
    fetch("http://localhost:8080/api/v1/materials/names")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch material names.");
        }
      })
      .then((data) => {
        setMaterialNames(data);
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

  const fetchMaterialTypeNames = (name) => {
    fetch(`http://localhost:8080/api/v1/materials/${name}/types`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch material types.");
        }
      })
      .then((data) => {
        setMaterialTypeNames(data);
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

  const handleCancel = () => {
    setMaterialName("");
    setMaterialTypeName("");
    setMaterialTypeNames([]); // Reset materialTypeNames state
    setShowNameInput(false);
    setShowTypeInput(false);
    setUserInputName("");
    setUserInputType("");
    setParameters([{ parameterName: "", rangeFrom: "", rangeTo: "" }]);
  };

  const handleSave = () => {
    let finalMaterialName = materialName;
    let finalMaterialTypeName;
  
    if (showNameInput && userInputName.trim() !== "") {
      finalMaterialName = userInputName.trim();
    } else if (
      materialName.trim() === "" ||
      materialTypeName.trim() === "" ||
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
      finalMaterialTypeName = userInputType.trim();
    } else if (!showTypeInput && materialTypeName.trim() !== "") {
      finalMaterialTypeName = materialTypeName.trim();
    }
  
    const materialData = {
      materialName: finalMaterialName,
      materialTypeName: finalMaterialTypeName,
      parameters: parameters.map((param) => ({
        parameterName: param.parameterName.trim(),
        rangeFrom: parseFloat(param.rangeFrom.trim()),
        rangeTo: parseFloat(param.rangeTo.trim()),
      })),
    };
  
    fetch("http://localhost:8080/api/v1/materials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(materialData),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            title: "Material saved successfully.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "btn btn-success",
            },
          }).then(() => {
            handleCancel();
            window.location.reload(); // Reload the page
          });
        } else {
          throw new Error("Failed to save material.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to save material.",
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
    setMaterialName(value);
    setShowNameInput(value === "add a material");
    if (value !== "add a material") {
      fetchMaterialTypeNames(value);
    } else {
      setMaterialTypeNames([]); // Reset materialTypeNames state
      setMaterialTypeName(""); // Reset materialTypeName state
    }
  };

  const handleTypeSelectChange = (event) => {
    const { value } = event.target;
    setMaterialTypeName(value);
    setShowTypeInput(value === "add a type");
  };

  const handleNameInputChange = (event) => {
    setUserInputName(event.target.value);
  };

  const handleTypeInputChange = (event) => {
    setUserInputType(event.target.value);
    setMaterialTypeName(event.target.value);
  };

  const handleParameterChange = (index, event) => {
    const { name, value } = event.target;
    const updatedParameters = [...parameters];
    updatedParameters[index][name] = value;
    setParameters(updatedParameters);
  };

  const handleAddParameter = () => {
    setParameters([...parameters, { parameterName: "", rangeFrom: "", rangeTo: "" }]);
  };

  const handleRemoveParameter = (index) => {
    const updatedParameters = [...parameters];
    updatedParameters.splice(index, 1);
    setParameters(updatedParameters);
  }

  return (
    <SideBar>
      <div className="material-management">
        <div className="material-management-main-content">
          <h2 className="text-center">Material Management</h2>
          <div className="create-user-container">
            <div
              className="card-body p-4"
              style={{ backgroundColor: "rgb(243,244,247)" }}
            >
              <form>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="materialName" className="form-label">
                      Material Name{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    {showNameInput ? (
                      <input
                        type="text"
                        className="form-control"
                        id="materialName"
                        value={userInputName}
                        onChange={handleNameInputChange}
                        required
                      />
                    ) : (
                      <select
                        className="form-select"
                        id="materialName"
                        value={materialName}
                        onChange={handleSelectChange}
                        required
                      >
                        <option value="">Select Material Name</option>
                        {materialNames.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                        <option value="add a material">Add Material</option>
                      </select>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="materialTypeName"
                      className="form-label"
                    >
                      Material Type{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    {showTypeInput ? (
                      <input
                        type="text"
                        className="form-control"
                        id="materialTypeName"
                        value={userInputType}
                        onChange={handleTypeInputChange}
                        required
                      />
                    ) : (
                      <div>
                        {materialTypeNames.length > 0 ? (
                          <select
                            className="form-select"
                            id="materialTypeName"
                            value={materialTypeName}
                            onChange={handleTypeSelectChange}
                            required
                          >
                            <option value="">Select Material Type</option>
                            {materialTypeNames.map((type, index) => (
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
                            id="materialTypeName"
                            value={userInputType}
                            onChange={handleTypeInputChange}
                            required
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
                      />
                    </div>
                    <div className="col-md-3">
                      <label
                        htmlFor={`rangeTo${index}`}
                        className="form-label"
                      >
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
                      />
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                      {index > 0 && (
                        <RemoveIcon
                        style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleRemoveParameter(index)}
      
                        />
                      )}
                      <AddIcon
                        style={{ cursor: 'pointer', marginLeft: '0.5rem', color: 'green' }}
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
                      fontWeight: "600",
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success-1 btn-hover"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      fontWeight: "600",
                      width: "100px",
                      border: "1px solid #cccccc",
                    }}
                    onClick={handleSave}
                  >
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

export default MaterialManagement;
