import React, { useState } from "react";

const Leagues = ({ query, data }) => {
  const [isleagueSelected, setisleagueSelected] = useState(false);
  const [leagueIndex, setleagueIndex] = useState();
  const [countryFlag, setcountryFlag] = useState("");

  if (isleagueSelected) {
    return (
      <div className="text-gray-400 ">
        {data[leagueIndex].Stages.map((comps, i) => {
          return (
            <div className="flex items-center cursor-pointer" key={i}>
              <img
                className="w-[20px] h-[10px] m-1 rounded-sm "
                src={`https://static.livescore.com/i2/fh/${countryFlag}.jpg`}
                alt={comps.Sdn}
              />

              <li className="list-none">{comps.Sdn}</li>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="text-gray-400">
        <h3 className="font-bold pb-2">Leagues</h3>
        <ul>
          {data
            .filter((data) =>
              data.Cnm.toLocaleLowerCase().includes(query.toLocaleLowerCase())
            )
            .map((l, i) => {
              return (
                <div
                  className="flex items-center cursor-pointer"
                  key={i}
                  onClick={() => {
                    setisleagueSelected(true);
                    setleagueIndex(i);
                    setcountryFlag(l.Ccd);
                  }}
                >
                  <img
                    className="w-[20px] h-[10px] m-1 rounded-sm "
                    src={`https://static.livescore.com/i2/fh/${l.Ccd}.jpg`}
                    alt={l.Cnm}
                  />
                  <li className="list-none">{l.Cnm}</li>
                </div>
              );
            })}
        </ul>
      </div>
    );
  }
};

export default Leagues;
