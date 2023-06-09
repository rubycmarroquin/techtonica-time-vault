import React, { useState, useEffect } from "react";
import CodeThread from "./CodeThread";
import CCModal from "./CCModal";
import "./listchallenges.css";

const ListChallenges = () => {
  const [allChallenges, setAllChallenges] = useState(null);

  // get request to retrieve all code challenge threads
  const loadChallenges = () => {
    fetch("http://localhost:8080/api/codechallenge")
      .then((response) => response.json())
      .then((challenges) => {
        setAllChallenges(challenges);
      });
  };

  useEffect(() => loadChallenges(), []);

  return (
    <div className="container-fluid">
      <div className="cc-modal">
        <CCModal loadChallenges={loadChallenges} />
      </div>
      <div className="all-threads">
        {allChallenges &&
          allChallenges.map((challenge) => {
            return (
              <CodeThread
                key={`code+${challenge.code_id}`}
                id={challenge.code_id}
                title={challenge.title}
                date={challenge.date}
                link={challenge.link}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ListChallenges;
