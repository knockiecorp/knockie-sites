import React, { useState } from "react";
import Result from "../native/Result";
import { useRouter } from "next/navigation";

export default function Results({ data }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    router.push(`?search=${search}`);
  };
  return (
    <div className="w-9/12 mx-auto space-y-6">
      <div className="w-1/2 ">
        <div className="mt-5 lg:mt-8 w-full flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="w-full">
            <input
              type="text"
              id="hero-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: "1px solid gray" }}
              name="hero-input"
              className="py-3 w-[620px] px-4 block  border-gray-800 shadow-sm rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search here"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            className="w-full ml-10 sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center bg-blue-400 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
          >
            Search
          </button>
        </div>
      </div>
      <div className="font-bold text-2xl">Results</div>
      {data && data.length > 0 ? (
        <>
          {data.map((r, i) => (
            <Result key={i} data={r} />
          ))}
        </>
      ) : (
        <div>No websites fount</div>
      )}
    </div>
  );
}
