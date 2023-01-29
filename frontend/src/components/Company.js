import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CompanyDataService from "../services/CompanionService";

const Company = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialCompanyState = {
    id: null,
    name: "",
    empresa: "",
    descripcion: "",
    empleados: "",
    pagos: "",
    dinero_gastado: ""
  };
  const [currentCompany, setCurrentCompany] = useState(initialCompanyState);
  const [message, setMessage] = useState("");

  const getCompany = id => {
    CompanyDataService.get(id)
      .then(response => {
        setCurrentCompany(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getCompany(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCompany({ ...currentCompany, [name]: value });
  };

  const updateCompany = () => {
    CompanyDataService.update(currentCompany.id, currentCompany)
      .then(response => {
        setMessage("The company was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCompany = () => {
    CompanyDataService.remove(currentCompany.id)
      .then(response => {
        navigate("/app/companies");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCompany ? (
        <div className="edit-form">
          <h4>Company</h4>
          <form>
            <div className="form-group">
              <label htmlFor="empresa">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="empresa"
                name="empresa"
                value={currentCompany.empresa}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={currentCompany.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="empleados">Empleados</label>
              <input
                type="text"
                className="form-control"
                id="empleados"
                name="empleados"
                value={currentCompany.empleados}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pagos">Pagos</label>
              <input
                type="text"
                className="form-control"
                id="pagos"
                name="pagos"
                value={currentCompany.pagos}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteCompany}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCompany}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Company...</p>
        </div>
      )}
    </div>
  );
};

export default Company;
