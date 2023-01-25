import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Fixtures from "./components/Fixtures";
import SearchBar from "./components/SearchBar";
import News from "./components/News";
import { FcCalendar } from "react-icons/fc";

function App() {
  const baseUrl = "https://livescore6.p.rapidapi.com";

  const [startDate, setStartDate] = useState(new Date());
  const [mydata, setmydata] = useState([]);
  const [fixture, setfixture] = useState([]);
  const [league, setleague] = useState([]);
  const [news, setnews] = useState([]);
  const date = moment(startDate).format("yyyy:MM:DD");
  const newDate = date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10);

  //const country = "england";
  //const league = "premier-league";
  

  const cat = [
    `matches/v2/list-by-date?Category=soccer&Date=${newDate}&Timezone=2`,
    "matches/v2/list-live?Category=soccer&Timezone=2",
    "leagues/v2/get-table?Category=soccer&Ccd=england&Scd=premier-league",
    "leagues/v2/list?Category=soccer",
    "news/v2/list",
  ];

  const [category, setcategory] = useState(cat[0]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d09a109c64msh0b65d276d97519bp1a664cjsn9718889325d2",
      "X-RapidAPI-Host": "livescore6.p.rapidapi.com",
    },
  };

  //Get matches from API
  useEffect(() => {
    const getMatches = async () => {
      await fetch(`${baseUrl}/${category}`, options)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setmydata(data.Stages);
          setfixture(data.Stages);
          setcategory(cat[0]);
          if (category === cat[1]) {
            setcategory(cat[1]);
          } else {
            setcategory(cat[0]);
          }
        })
        .catch((err) => console.error(err));
    };
    getMatches();
  }, [category, startDate]);

  //Get leagues from API
  useEffect(() => {
    const getLeagues = async () => {
      await fetch(`${baseUrl}/${cat[3]}`, options)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setleague(data.Ccg);
        })
        .catch((err) => console.error(err));
    };

    getLeagues();
  }, []);

  useEffect(() => {
    const getNews = async () => {
      await fetch(`${baseUrl}/${cat[4]}`, options)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setnews(data.topStories);
        })
        .catch((err) => console.error(err));
    };

    getNews();
  }, []);

  return (
    <div className="container w-full md:w-[80%] h-fit mx-auto bg-slate-900  rounded-lg">
      {/* NavBar Start here */}
      <div
        className="bg-inherit text-2xl font-extrabold text-white border-b border-slate-800 p-10 cursor-pointer"
        onClick={() => {
          setStartDate(new Date());
          setcategory(cat[0]);
        }}
      >
        <span>LiveSports</span>
      </div>
      {/* NavBar end here */}

      <div className="grid grid-cols-1  md:grid-cols-8 gap-0">
        {/* search bar */}
        <div className="col-span-2">
          {" "}
          <div className="hidden overflow-hidden md:block ">
            <SearchBar league={league} category={category} />
          </div>
        </div>
        {/* search bar End here */}

        {/* fixturex and controller start here */}

        <div className=" border  border-slate-800  rounded-lg m-3  col-span-4">
          <div className=" flex  text-center items-center m-0 border-b h-16 border-slate-800">
            <div className="mx-5">
              <button
                onClick={() => {
                  setcategory(cat[1]);
                  setfixture(mydata);
                }}
                className="text-black bg-white m-2 rounded-sm p-1"
              >
                live
              </button>
            </div>
            <div className="mx-5">
              <div className="text-white font-bold grid text-xs">
                <div>{moment(startDate).subtract(1, "day").format("ddd")}</div>
                <div className="flex">
                  {moment(new Date()).subtract(1, "day").format("DD MMM")}
                </div>{" "}
              </div>
            </div>

            <div
              className="text-white font-bold grid text-xs  cursor-pointer mx-5"
              onClick={() => {
                setcategory(cat[0]);
              }}
            >
              <div>Today</div>
              <div>{moment(new Date()).format("DD MMM")}</div>{" "}
            </div>

            <div className="mx-5">
              <div className="text-white font-bold grid text-xs">
                <div>{moment(startDate).add(1, "day").format("ddd")}</div>
                <div>
                  {moment(new Date()).add(1, "day").format("DD MMM")}
                </div>{" "}
              </div>
            </div>

            <div className=" flex items-center relative">
              <div className="w-fit ">
                <DatePicker
                  id="mydate"
                  className="text-black rounded-full ml-3 w-[60%] "
                  selected={startDate}
                  onChange={(date) => {
                    setcategory(cat[0]);
                    setStartDate(date);
                    setfixture(mydata);
                  }}
                />
              </div>
              <div className="absolute right-[20%] text-2xl">
                <FcCalendar />
              </div>
            </div>
          </div>

          <div>
            <Fixtures fixtures={fixture} category={category} />
          </div>
        </div>

        {/* fixturex and controller Ends here */}

        <div className=" hidden text-white col-span-2 border m-3 border-slate-800 rounded-lg md:block ">
          <div className="flex justify-center items-center text-center h-16 border-b border-slate-800">
            <span className="font-bold">News</span>
          </div>
          <div className="">
            <News news={news} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
