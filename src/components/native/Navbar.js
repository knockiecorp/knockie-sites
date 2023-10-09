import React from "react";
import logo from "@/assets/logo.png";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const search_params = useSearchParams();
  const search_key = search_params.get("search");
  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav
          className="   w-11/12  mx-auto px-4 sm:flex sm:items-center justify-between"
          aria-label="Global"
        >
          {search_key != "" && (
            <a href="/?search=">
              <img className="w-40 " src={logo.src} />
            </a>
          )}
          <div className="flex p-3 flex-col ml-auto gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:pl-5">
            <a href="/available-sites">Available sites</a>
            <a
              className="font-medium text-xl text-black hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
              href="#"
            >
              Account
            </a>
            <a
              className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                id="apps"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}
