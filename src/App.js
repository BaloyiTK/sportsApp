import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Fixtures from "./components/Fixtures";

function App() {
  const [startDate, setStartDate] = useState( new Date());
  const [mydata, setmydata] = useState([]);
  const [fixture, setfixture] = useState([]);
  const [category1, setcategory1] = useState("")
  const [category2, setcategory2] = useState("")
  const [category3, setcategory3] = useState("")

  const date = moment(startDate).format("yyyy:MM:DD");


 // const [first, setfirst] = useState(second)


  const newDate = date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10);


  const country = "england";
  const league = "premier-league";

  const default_cat = `matches/v2/list-by-date?Category=soccer&Date=${newDate}&Timezone=2`;
  const [category, setcategory] = useState(default_cat);

  const baseUrl = "https://livescore6.p.rapidapi.com";

  const cat1 = `matches/v2/list-by-date?Category=soccer&Date=${newDate}&Timezone=2`;
  const cat2 = "matches/v2/list-live?Category=soccer&Timezone=2";
  const cat3 =
    "leagues/v2/get-table?Category=soccer&Ccd=england&Scd=premier-league";

  const cat4 = "leagues/v2/list?Category=soccer";

    
  console.log(date + " " + newDate + " " + startDate);

  console.log(category)
 


  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': 'b90ab81740mshe12b83ba15e358ap125ba5jsndc2ae046010a',
      "X-RapidAPI-Host": "livescore6.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetchData();

  }, [category,]);

  const fetchData = async () => {
    await fetch(`${baseUrl}/${category}`, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setmydata(data.Stages);
        setfixture(data.Stages);
        setcategory(category)
      })
      .catch((err) => console.error(err));
  };



  

  return (
    <>
      <div className="bg-black flex text-center items-center">
        <div>
          <button
            onClick={(e) => {
              setcategory(cat2);
            }}
            className="text-black bg-white m-2 rounded-sm p-1"
          >
            live
          </button>
        </div>
        <div className="mx-2">
          <div
            className="text-white font-bold grid text-xs hover:text-red-500 cursor-pointer"
            // onClick={() => {
            //   setcategory(cat1);
         
            // }}
          >
            <div>{moment(startDate).subtract(2, "day").format("ddd")}</div>
            <div>
              {moment(startDate).subtract(2, "day").format("DD MMM")}
            </div>{" "}
          </div>
        </div>
        <div className="mx-2">
          <div className="text-white font-bold grid text-xs">
            <div>{moment(startDate).subtract(1, "day").format("ddd")}</div>
            <div>
              {moment(startDate).subtract(1, "day").format("DD MMM")}
            </div>{" "}
          </div>
        </div>

        <div className="mx-6">
          <div className="text-white font-bold grid text-xs">
            <div>Today</div>
            <div>{moment(startDate).format("DD MMM")}</div>{" "}
          </div>
        </div>

        <div className="mx-2">
          <div className="text-white font-bold grid text-xs">
            <div>{moment(startDate).add(1, "day").format("ddd")}</div>
            <div>{moment(startDate).add(1, "day").format("DD MMM")}</div>{" "}
          </div>
        </div>
        <div className="text-white mx-2">
          <div className=" font-bold grid text-xs">
            <p className="p-[-12px]">
              {moment(startDate).add(2, "day").format("ddd")}
            </p>
            <p>{moment(startDate).add(2, "day").format("DD MMM")}</p>{" "}
          </div>
        </div>

        <div>
          <DatePicker
            id="mydate"
            className="text-black rounded-full "
            selected={startDate}
            onChange={(date) => {
              setcategory1(cat1)
              setcategory(category1);
              setStartDate(date);
              setfixture(mydata);
              fetchData();
            
         
            }}
            
          />
        </div>
      </div>

      <Fixtures fixtures={fixture} category = {category}/>
    </>
  );
}

export default App;
