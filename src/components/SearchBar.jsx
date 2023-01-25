import { IoIosSearch, IoIosClose } from "react-icons/io";
import React, { useState } from "react";
import Leagues from "./Leagues";

const SearchBar = ({ league, category }) => {
  const [typed, setTyped] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="grid grid-cols-1 border-[1px] border-slate-800 m-3 rounded-lg  ">
      <div>
        <div className="border-b border-slate-800 flex items-center h-16 p-3 text-gray-400">
          <div className="text-xl m-2">
            <IoIosSearch />
          </div>
          <div className="flex items-center relative">
            <div></div>
            <div></div>

            <input
              className="focus:outline-none bg-inherit text-white"
              type="text"
              value={query}
              placeholder="Search..."
              onChange={(e) => {
                const search = e.target.value;
                setQuery(search);
                setTyped(true);

                if (search === "") {
                  setTyped(false);
                }
              }}
            />

            <div className="text-3xl text-white w-0 absolute right-4 ">
              <IoIosClose
                className={` ${typed ? "block" : "hidden"}`}
                onClick={() => {
                  setQuery("");
                  setTyped(false);
                }}
              />
            </div>
          </div>
        </div>

        <div className="h-screen pl-4 pt-2">
          <Leagues query={query} data={league} />
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
