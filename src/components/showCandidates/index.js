import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowCandidates = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];
    setAllCandidates(candidates);
  }, []);
  const onClickDelete = (id) => {
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];
    const remainingCandidates = candidates.filter((each) => each.id !== id);
    setAllCandidates(remainingCandidates);
    localStorage.setItem(
      "candidates",
      JSON.stringify([...remainingCandidates])
    );
  };
  return (
    <div className="container my-4">
      <main>
        <div className="py-5">
          <h2>
            Candidates List
            <Link to="/addCandidate">
              <button className="btn btn-primary float-end">
                Add Candidate
              </button>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-12 ms-auto me-auto">
            <div className="card">
              <div className="card-body">
                <table className="table">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number of Skills</th>
                    <th>Total Work Experience (in months)</th>
                    <th>Actions</th>
                  </tr>
                  {allCandidates.map((each, i) => {
                    let exp = 0;
                    each.personalInformation.experiences.map(
                      (each) => (exp += Number(each.duration))
                    );
                    //hi
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          {each.information.firstName +
                            " " +
                            each.information.lastName}
                        </td>
                        <td>{each.information.email}</td>
                        <td>{each.personalInformation.skills.length}</td>
                        <td>{exp}</td>
                        <td>
                          <a href="">Edit</a>
                          <a
                            href=""
                            className="text-danger ms-2"
                            onClick={() => {
                              onClickDelete(each.id);
                            }}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShowCandidates;
