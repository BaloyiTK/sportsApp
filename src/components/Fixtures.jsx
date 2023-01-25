import moment from "moment/moment";
import { AiOutlineInfoCircle } from "react-icons/ai";

const imageUrl = "https://lsm-static-prod.livescore.com/medium/";

const Fixtures = ({ fixtures, category }) => {
  if (fixtures.length === 0) {
    return (
      <div className="pl-6 rounded-lg mt-3 flex items-center text-center border w-fit  border-slate-800 text-gray-400 ">
        <span className="text-orange-500 font-bold">
          <AiOutlineInfoCircle />
        </span>

        <p className=" p-1">There are no live games currently in progress</p>
      </div>
    );
  } else {
    return (
      <div className=" items-center border w-[125%]  border-slate-800 text-gray-400 ">
        {fixtures &&
          fixtures.map((f, i) => {
            return (
              <div className="w-[80%]" key={i}>
                <div className="m-3 flex items-center">
                  <img
                    className="w-[30px] h-[15px] rounded-sm pr-2"
                    src={`https://static.livescore.com/i2/fh/${f.Ccd}.jpg`}
                    alt={f.Ccd}
                  />
                  <div className="grid">
                    <span className="font-bold text-white">{f.Cnm}</span>
                    <span className="text-xs text-gray-300">{f.Snm}</span>
                  </div>
                </div>

                <div className="m-3">
                  <div className="grid">
                    {f.Events.map((e, i) => {
                      return (
                        <div key={i}>
                          <div
                            className="flex items-center bg-slate-800 w-[100%] rounded-lg text-gray-300 hover:bg-slate-500"
                            key={i}
                          >
                            <div className="p-5 w-[30%] ">
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
                                  e.Eps === "Canc." ||
                                  e.Eps === "AAW" ||
                                  e.Eps === "Aband." ? (
                                  <span>{e.Eps}</span>
                                ) : (
                                  <span>
                                    {moment(
                                      e.Esd.toString().slice(0, 8) +
                                        "T" +
                                        e.Esd.toString().slice(8, 15)
                                    ).format("HH:mm")}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="grid w-[100%] ">
                              <div className="flex items-center mb-2">
                                <img
                                  className="w-[20px] h-[20px] mr-2 "
                                  src={imageUrl + e.T1[0].Img}
                                  alt={e.T1[0].Nm}
                                />
                                <span>{e.T1[0].Nm}</span>
                              </div>

                              <div className="flex items-center">
                                <img
                                  className="w-[20px] h-[20px] mr-2 "
                                  src={imageUrl + e.T2[0].Img}
                                  alt={e.T2[0].Nm}
                                />
                                <span>{e.T2[0].Nm}</span>
                              </div>
                            </div>

                            <div className="w-[50%]  flex justify-end mr-10 ">
                              <div className="grid">
                                <div className="font-bold text-base items-center mb-2">
                                  <span className="text-red-400 m-1">
                                    {e.Trp1}
                                  </span>
                                  <span> {e.Tr1}</span>
                                </div>
                                <div className=" font-bold text-base items-center">
                                  <span className="text-red-400 p-1">
                                    {e.Trp2}
                                  </span>
                                  <span> {e.Tr2}</span>
                                </div>
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
  }
};

export default Fixtures;
