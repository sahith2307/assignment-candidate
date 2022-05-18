import React, { useEffect, useState } from "react";
import ExperienceCard from "../ExperienceCard";
import { v4 as uuid4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./index.css";
const AddCandidate = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    gender: false,
    email: false,
    false: false,
  });
  const [address, setAddress] = useState({
    addressDetails: "",
    country: "",
    state: "",
    zipCode: "",
  });
  // const [address, setAddress] = useState({
  //   addressDetails: "",
  //   country: "",
  //   state: "",
  //   zipCode: "",
  // });
  const [allStates, setAllStates] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    getAllCountries();
  }, []);
  const [allExperiences, setAllExperiences] = useState([
    { id: uuid4(), companyName: "", duration: "", responsibilities: "" },
    { id: uuid4(), companyName: "", duration: "", responsibilities: "" },
  ]);
  const rawDataExperience = {
    companyName: "",
    duration: "",
    responsibilities: "",
  };
  const onsubmitCandidate = (event) => {
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];

    const experienceFields = allExperiences.filter(
      (each) => each.companyName && each.duration && each.responsibilities
    );
    console.log(experienceFields);
    if (allExperiences >= 2 && allExperiences <= 5) {
      alert("Experience should be min 2 and max 5");
    } else if (experienceFields.length !== allExperiences.length) {
      alert("fill all the experience fields");
    } else if (!(skills.length >= 3)) {
      alert("Skills minimum 3");
    } else if (
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.skills
    ) {
      alert("fill the red bordered fields");
    } else if (
      !(
        address.addressDetails ||
        address.country ||
        address.state ||
        address.zipCode ||
        details.gender
      )
    ) {
      alert("fill all the address fields and gender");
    } else {
      localStorage.setItem(
        "candidates",
        JSON.stringify([
          ...candidates,
          {
            id: uuid4(),
            information: { ...details, address },
            personalInformation: { skills, experiences: allExperiences },
          },
        ])
      );
      navigate("/candidates");
    }
  };
  const onClickAddExperience = () => {
    console.log(allExperiences);
    setAllExperiences((prev) => [
      ...prev,
      { ...rawDataExperience, id: uuid4() },
    ]);
  };
  const onChangeSkills = (event) => {
    if (event.target.checked) {
      setSkills((prev) => [...prev, event.target.value]);
    } else {
      setSkills((prev) => [
        ...prev.filter((each) => each !== event.target.value),
      ]);
    }
  };

  const getAllCountries = async (country) => {
    const options = {
      Method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzYWlzYWhpdGgwN0BnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJhQVpnR2QybEUtUDZkb1p4SUNPdUVqbWZzQWNSR2xkdC1WMGQxNUY1ZjRHNlR1d1A5bnJ5YlQ4NUpkM0pYdXBiS3M4In0sImV4cCI6MTY1Mjk1NzMyN30.R185Zl9UfXJrFs5LQnTgbywe1lFp4KTi56_O4bxsfRU",
      },
    };

    const response = await fetch(
      `https://www.universal-tutorial.com/api/countries/`,
      options
    );
    const data = await response.json();
    const updatedData = data.map((each) => ({
      label: each.country_name,
    }));
    setAllCountries(updatedData);
  };

  const getAllStates = async (country) => {
    const options = {
      Method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzYWlzYWhpdGgwN0BnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJhQVpnR2QybEUtUDZkb1p4SUNPdUVqbWZzQWNSR2xkdC1WMGQxNUY1ZjRHNlR1d1A5bnJ5YlQ4NUpkM0pYdXBiS3M4In0sImV4cCI6MTY1Mjk1NzMyN30.R185Zl9UfXJrFs5LQnTgbywe1lFp4KTi56_O4bxsfRU",
      },
    };

    const response = await fetch(
      `https://www.universal-tutorial.com/api/states/${country}`,
      options
    );
    const data = await response.json();
    const updatedData = data.map((each) => ({
      label: each.state_name,
    }));
    setAllStates(updatedData);
  };
  const onChangeFirstName = (event) => {
    setDetails((prev) => ({ ...prev, firstName: event.target.value }));
    if (!event.target.value) {
      setErrors((prev) => ({ ...prev, firstName: true }));
    } else {
      setErrors((prev) => ({ ...prev, firstName: false }));
    }
  };

  const onChangeGender = (event) => {
    setDetails((prev) => ({ ...prev, gender: event.target.value }));
  };
  const onChangeLastName = (event) => {
    setDetails((prev) => ({ ...prev, lastName: event.target.value }));
    if (!event.target.value) {
      setErrors((prev) => ({ ...prev, lastName: true }));
    } else {
      setErrors((prev) => ({ ...prev, lastName: false }));
    }
  };
  const onChangeEmail = (event) => {
    setDetails((prev) => ({ ...prev, email: event.target.value }));
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
        event.target.value
      )
    ) {
      setErrors((prev) => ({ ...prev, email: true }));
    } else {
      setErrors((prev) => ({ ...prev, email: false }));
    }
  };

  const onChangeCountry = (event) => {
    setAddress((prev) => ({ ...prev, country: event.target.value }));
    getAllStates(event.target.value);
  };
  const onChangeState = (event) => {
    setAddress((prev) => ({ ...prev, state: event.target.value }));
  };
  const onChangeAddressDetails = (event) => {
    setAddress((prev) => ({ ...prev, addressDetails: event.target.value }));
    // if (!event.target.value) {
    //   setErrors((prev) => ({ ...prev, lastName: true }));
    // } else {
    //   setErrors((prev) => ({ ...prev, lastName: false }));
    // }
  };
  const onChangeZipCode = (event) => {
    setAddress((prev) => ({ ...prev, zipCode: event.target.value }));
  };
  const onChangeDuration = (id, value) => {
    const updated = allExperiences?.map((each) => {
      if (each.id === id) {
        return { ...each, duration: value };
      } else {
        return { ...each };
      }
    });

    setAllExperiences(updated);
  };
  const onChangeCompany = (id, value) => {
    const updated = allExperiences?.map((each) => {
      if (each.id === id) {
        return { ...each, companyName: value };
      } else {
        return { ...each };
      }
    });

    setAllExperiences(updated);
  };
  const onChangeResponsibilities = (id, value) => {
    const updated = allExperiences?.map((each) => {
      if (each.id === id) {
        return { ...each, responsibilities: value };
      } else {
        return { ...each };
      }
    });

    setAllExperiences(updated);
  };
  const onClickRemove = (id) => {
    const updated = allExperiences?.filter((each) => each.id !== id);

    setAllExperiences(updated);
  };
  return (
    <div>
      <div className="container my-4">
        <main>
          <div className="py-5 text-center">
            <h2>Add Candidate</h2>
          </div>
          <div className="row g-5">
            <div className="col-md-7 col-lg-8 ms-auto me-auto">
              <h4 className="mb-3">Basic Info</h4>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label">First name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.firstName ? "border-danger" : ""
                    }`}
                    id="firstName"
                    onChange={onChangeFirstName}
                  />
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Last name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.lastName ? "border-danger" : ""
                    }`}
                    onChange={onChangeLastName}
                  />
                </div>

                <div className="col-12" onChange={onChangeGender}>
                  <label className="form-label">Gender</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="Male"
                      />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="female"
                      />
                      <label className="form-check-label">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="other"
                      />
                      <label className="form-check-label">Other</label>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "border-danger" : ""
                    }`}
                    placeholder="you@example.com"
                    onChange={onChangeEmail}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    placeholder="1234 Main St"
                    onChange={onChangeAddressDetails}
                  />
                </div>

                <div className="col-md-5">
                  <label className="form-label">Country</label>
                  <select className="form-select" onChange={onChangeCountry}>
                    <option value="">Choose...</option>
                    {allCountries.map((each) => (
                      <option key={each.label} value={each.label}>
                        {each.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <select className="form-select" onChange={onChangeState}>
                    <option value="">Choose...</option>
                    {allStates.map((each) => (
                      <option key={each.label} value={each.label}>
                        {each.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Pin / Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChangeZipCode}
                  />
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Professional Info</h4>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">
                    Choose your skills
                    <span className="small text-muted">(min 3 skills)</span>
                  </label>
                  <div className="mb-3" onChange={onChangeSkills}>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Angular"
                      />
                      <label className="form-check-label">Angular</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="React"
                      />
                      <label className="form-check-label">React</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Node.Js"
                      />
                      <label className="form-check-label">Node.JS</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="JavaScript"
                      />
                      <label className="form-check-label">JavaScript</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Flutter"
                      />
                      <label className="form-check-label">Flutter</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Java"
                      />
                      <label className="form-check-label">Java</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row gy-3">
                <div className="col-12">
                  <label className="form-label">
                    <strong>
                      Experience
                      <span className="small text-muted">
                        (min 2, max 5 items)
                      </span>
                    </strong>
                  </label>
                  {allExperiences.map((each, index) => (
                    <ExperienceCard
                      allExperiences={allExperiences}
                      key={each.id}
                      number={index + 1}
                      details={each}
                      setAllExperiences={setAllExperiences}
                      onChangeDuration={onChangeDuration}
                      onChangeCompany={onChangeCompany}
                      onChangeResponsibilities={onChangeResponsibilities}
                      onClickRemove={onClickRemove}
                    />
                  ))}
                  <button
                    className="btn text-primary d-block mt-3"
                    onClick={onClickAddExperience}
                    type="button"
                    disabled={allExperiences.length === 5}
                  >
                    Add more experience
                  </button>
                </div>
              </div>

              <hr className="my-4" />

              <button
                className="btn btn-primary"
                type="button"
                onClick={onsubmitCandidate}
              >
                Save Candidate
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCandidate;
