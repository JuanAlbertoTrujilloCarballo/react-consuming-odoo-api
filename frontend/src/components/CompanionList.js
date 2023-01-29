import React, { useState, useEffect } from "react";
import CompanyDataService from "../services/CompanionService";
import { Link } from "react-router-dom";

const CompanionList = () => {
  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    retrieveCompanies();
  }, []);

  const onChangeSearchId = e => {
    const searchId = e.target.value;
    setSearchId(searchId);
  };

  const retrieveCompanies = () => {
    CompanyDataService.getAll()
      .then(response => {
        setCompanies(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCompanies();
    setCurrentCompany(null);
    setCurrentIndex(-1);
  };

  const setActiveCompany = (company, index) => {
    setCurrentCompany(company);
    setCurrentIndex(index);
  };

  const removeAllCompanies = () => {
    CompanyDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findById = () => {

    if(searchId === '') {
      refreshList();
      return;
    }

    CompanyDataService.findById(searchId)
      .then(response => {
        setCompanies(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by id"
            value={searchId}
            onChange={onChangeSearchId}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findById}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Companies List</h4>

        <ul className="list-group">
          {companies &&
            companies.map((company, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCompany(company, index)}
                key={index}
              >
                {company.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCompanies}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCompany ? (
          <div>
            <h4>Company</h4>
            <div>
              <label>
                <strong>Id:</strong>
              </label>{" "}
              {currentCompany.name}
            </div>
            <div>
              <label>
                <strong>Nombre de la empresa:</strong>
              </label>{" "}
              {currentCompany.empresa}
            </div>
            <div>
              <label>
                <strong>Descripcion de la empresa:</strong>
              </label>{" "}
              {currentCompany.descripcion}
            </div>
            <div>
              <label>
                <strong>Cantidad de empleados:</strong>
              </label>{" "}
              {currentCompany.empleados}
            </div>
            <div>
              <label>
                <strong>Dinero pagado a cada empleado:</strong>
              </label>{" "}
              {currentCompany.pagos}
            </div>
            <div>
              <label>
                <strong>Dinero gastado en los empleados:</strong>
              </label>{" "}
              {currentCompany.dinero_gastado}
            </div>

            <Link
              to={"/app/companies/" + currentCompany.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Company...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanionList;
