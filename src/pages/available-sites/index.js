import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Index() {
  const [sites, setSites] = useState([]);
  const route = useRouter();
  const searchSites = async () => {
    const response = await fetch("http://localhost:5000/sites", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      setSites(json);
    }
  };
  useEffect(() => {
    searchSites();
  }, [route]);
  return (
    <div className="w-9/12 space-y-4 mx-auto mt-20">
      <p
        className="font-medium text-xl text-black hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
        href="#"
      >
        Available Websites in our database to search from
      </p>
      <ul className="list-disc space-y-6 list-inside text-gray-900 dark:text-gray-200">
        {sites &&
          sites.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              <img
                className="w-8"
                src={s && `${s}/favicon.ico`}
                alt="favicon"
              />
              {s}
            </li>
          ))}
      </ul>
    </div>
  );
}
