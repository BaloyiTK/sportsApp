import moment from "moment/moment";
import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

const imageUrl = "https://lsm-static-prod.livescore.com/medium/";

const Fixtures = ({ fixtures, category }) => {
  return (
    <div className="bg-black">
      {fixtures &&
        fixtures.map((f, i) => {
          return (
            <div key={i}>
              <div className="m-3 flex items-center">
                <img
                  className="w-[30px] h-[15px] rounded-sm pr-2"
                  src={`https://static.livescore.com/i2/fh/${f.Ccd}.jpg`}
                  alt=""
                />
                <div>
                  {" "}
                  <p className="font-bold text-white">{f.Cnm}</p>
                  <p className="text-xs text-gray-300">{f.Snm}</p>
                </div>
              </div>

              <div className="m-3">
                <div className="grid">
                  {f.Events.map((e, i) => {
                    return (
                      <div key={i}>
                        <div
                          className="flex items-center bg-slate-900 w-[500px] rounded-lg text-gray-300 hover:bg-slate-800"
                          key={i}
                        >
                          <div className="p-5 w-[30%]">
                            <div className="">
                              {category ===
                              "matches/v2/list-live?Category=soccer&Timezone=2" ? (
                                <div className="items-center flex ">
                                  <span className="text-green-500 animate-ping opacity-100 rounded-full mr-2 bg-green-500 w-2 h-2"></span>
                                  <span className="text-green-500 ">
                                    {e.Eps}
                                  </span>
                                </div>
                              ) : e.Eps === "FT" ||
                                e.Eps === "Postp." ||
                                e.Eps === "AET" ||
                                e.Eps === "AP" ||
                                e.Eps === "Canc." ? (
                                e.Eps
                              ) : (
                                moment(
                                  e.Esd.toString().slice(0, 8) +
                                    "T" +
                                    e.Esd.toString().slice(8, 15)
                                ).format("HH:mm")
                              )}
                            </div>
                          </div>

                          <div className="grid w-[90%]">
                            <div className="flex  items-center p-1 ">
                              <div className="flex">
                                <img
                                  className="w-[20px] h-[20px] "
                                  src={imageUrl + e.T1[0].Img}
                                  alt=""
                                />
                                <p>{e.T1[0].Nm}</p>
                              </div>
                            </div>

                            <div className="flex items-center p-1">
                              <img
                                className="w-[20px] h-[20px] "
                                src={imageUrl + e.T2[0].Img}
                                alt=""
                              />
                              <p>{e.T2[0].Nm}</p>
                            </div>
                          </div>

                          <div className="w-[50%]  flex justify-end mr-10">
                            <div className="grid">
                              {" "}
                              <p className="font-bold text-base m-1 items-center">
                                {e.Tr1}
                              </p>
                              <p className=" font-bold text-base m-1 items-center">
                                {e.Tr2}
                              </p>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Fixtures;
