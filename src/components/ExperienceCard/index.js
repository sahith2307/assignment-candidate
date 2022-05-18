import React from "react";

const ExperienceCard = (props) => {
  const {
    allExperiences,
    number,
    details,
    onChangeCompany,
    onChangeDuration,
    onChangeResponsibilities,
    onClickRemove,
  } = props;
  return (
    <div>
      <div className="card mx-3 mt-3">
        <div className="card-body">
          <h6 className="card-title text-muted mb-3">
            Experience #{number}
            <button
              className="btn float-end text-danger fw-normal"
              onClick={() => onClickRemove(details.id)}
              disabled={allExperiences.length === 2}
            >
              Remove
            </button>
          </h6>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                onChange={(e) => onChangeCompany(details.id, e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">
                Duration <span className="text-muted">(in months)</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="duration"
                onChange={(e) => onChangeDuration(details.id, e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">
                Describe your responsibilities
              </label>
              <textarea
                className="form-control"
                id="responsibilities"
                onChange={(e) => {
                  onChangeResponsibilities(details.id, e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
