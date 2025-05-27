"use client";

import { useState } from "react";
import { useApi } from "./ApiProvider";

export type PetFormData = {
  age: number;
  breedType: string;
  hasPreExistingConditions: boolean;
  coverageLevel: string;
};

const breedTypes = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "French Bulldog",
  "Bulldog",
  "Poodle",
  "Beagle",
  "Rottweiler",
  "Dachshund",
  "Yorkshire Terrier",
];

const Form = () => {
  // const { data, loading, error, fetchData } = useApi();
  const { fetchData, data, loading, error } = useApi();

  // const [formData, setFormData] = useState<FormData>({
  //   age: 0,
  //   breedType: "",
  //   condition: false,
  //   coverage: "",
  // });

  const value = true;

  const [breed, setBreed] = useState<string>("");
  const [condition, setCondition] = useState<boolean | null>(null);
  const [coverage, setCoverage] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    if (type === "breed") {
      setBreed(event.target.value);
    } else if (type === "condition") {
      console.log(event.target.value);
      const val = event.target.value;
      if (val === "false") {
        setCondition(false);
      } else if (val === "true") {
        setCondition(true);
      } else {
        setCondition(null);
      }
    } else if (type === "coverage") {
      setCoverage(event.target.value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "age") {
      setAge(+value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    // if (e.target.validity.valid) {
    // }

    const form = e.currentTarget as HTMLFormElement;
    const isValid = form.checkValidity();
    if (isValid) {
      fetchData({
        age,
        breed,
        hasPreExistingConditions: condition,
        coverageLevel: coverage,
      });
    }
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  // if (!data || data.length === 0) return null;

  return (
    <div className="page-container">
      {/* Header */}
      <header className="site-header">
        <div className="header-content">
          <h1>My Application</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">User Information</h2>
          </div>

          <div className="form-wrapper">
            <div className="form-card">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="breed" className="form-label" />
                    <div>
                      <label htmlFor="simple-select">Breed</label>
                      <div>
                        <select
                          id="simple-select"
                          value={breed}
                          onChange={(e) => handleSelectChange(e, "breed")}
                          className="form-input"
                          required
                        >
                          <option value="">-- Select --</option>

                          {breedTypes.map((item, index) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="0"
                      required
                      value={age}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="breed" className="form-label" />
                    <div>
                      <label htmlFor="simple-select">
                        Pre-existing Condition
                      </label>
                      <div>
                        <select
                          id="simple-select"
                          value={String(condition)}
                          onChange={(e) => handleSelectChange(e, "condition")}
                          className="form-input"
                          required
                        >
                          <option value="">-- Select --</option>
                          <option value={"true"}>{"True"}</option>
                          <option value={"false"}>{"False"}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="breed" className="form-label" />
                    <div>
                      <label htmlFor="simple-select">Coverage Level</label>
                      <div>
                        <select
                          id="simple-select"
                          value={coverage}
                          onChange={(e) => handleSelectChange(e, "coverage")}
                          className="form-input"
                          required
                        >
                          <option value="">-- Select --</option>
                          <option value={"basic"}>{"Basic"}</option>
                          <option value={"standard"}>{"Standard"}</option>
                          <option value={"premium"}>{"Premium"}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="form-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="site-footer">
        <div className="footer-content">
          <div>Footer</div>
        </div>
      </footer> */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          borderTop: "1px solid #ccc",
        }}
      >
        <h3>Premium Breakdown</h3>

        {data && (
          <div style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Total Premium:</strong> ${data.totalPremium}
            </p>
            <ul>
              <li>Base Premium: ${data.breakdown.basePremium}</li>
              <li>Age Adjustment: ${data.breakdown.ageAdjustment}</li>
              <li>
                Pre-existing Conditions Adjustment: $
                {data.breakdown.preExistingConditionsAdjustment}
              </li>
              <li>
                Coverage Level Adjustment: $
                {data.breakdown.coverageLevelAdjustment}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
