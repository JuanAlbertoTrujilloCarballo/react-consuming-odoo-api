import React, { useState } from "react";
import CompanyDataService from "../services/CompanionService";

const AddCompany = () => {
  const initialCompanyState = {
    id: null,
    name: "",
    empresa: "",
    descripcion: "",
    empleados: "",
    pagos: "",
  };
  const [company, setCompany] = useState(initialCompanyState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCompany({ ...company, [name]: value });
  };

  const saveCompany = () => {
    var data = {
      name: company.name,
      empresa: company.empresa,
      descripcion: company.descripcion,
      empleados: company.empleados,
      pagos: company.pagos    
    };

    CompanyDataService.create(data)
      .then(response => {
        setCompany({
          id: response.data.id,
          name: response.data.name,
          empresa: response.data.empresa,
          descripcion: response.data.descripcion,
          empleados: response.data.empleados,
          pagos: response.data.pagos,
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCompany = () => {
    setCompany(initialCompanyState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCompany}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Id</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={company.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="empresa">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="empresa"
              name="empresa"
              value={company.empresa}
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
              value={company.descripcion}
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
              value={company.empleados}
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
              value={company.pagos}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={saveCompany} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCompany;
