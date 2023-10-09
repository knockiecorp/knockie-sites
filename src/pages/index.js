import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { useRouter, useSearchParams } from "next/navigation";
import Results from "@/components/pages/Results";

export default function Home() {
  const search_params = useSearchParams();
  const route = useRouter();
  const [search, setSearch] = useState("");
  const search_key = search_params.get("search");

  const handleSearch = () => {
    route.push(`?search=${search}`);
  };
  const [sites, setSites] = useState([]);

  const searchSites = async () => {
    const response = await fetch("http://localhost:5000/sites/search", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search_value: `${search_key}` }),
    });
    const json = await response.json();
    if (response.ok) {
      setSites(json);
    }
  };
  useEffect(() => {
    searchSites();
  }, [search_params, route, search_key]);
  return (
    <div className="h-screen w-screen">
      {search_key != "" ? (
        <Results data={sites} />
      ) : (
        <div className="m-auto w-fit mt-56">
          <img className="w-40 mx-auto" src={logo.src} />
          <div className=" ">
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
                className="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center bg-blue-400 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
              >
                Search
              </button>
              <a
                className="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center bg-blue-400 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                href="#"
              >
                AI Search
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
