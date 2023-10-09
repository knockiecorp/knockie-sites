import axios from "axios";
import parse from "node-html-parser";
import React, { useEffect, useState } from "react";

export default function Result({ data }) {
  const [seoDescription, setSeoDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [seoAuthor, setSeoAuthor] = useState("");

  useEffect(() => {
    async function fetchSeoDescription() {
      try {
        const response = await axios.get(data);
        const html = response.data;
        const root = parse(html);

        // Search for the title tag
        const titleTag = root.querySelector("title");
        const titleContent = titleTag ? titleTag.text : "Title not found";

        // Search for the keywords meta tag
        const keywordsMetaTag = root.querySelector('meta[name="keywords"]');
        const keywordsContent = keywordsMetaTag
          ? keywordsMetaTag.getAttribute("content")
          : "Keywords not found";

        // Search for the author meta tag
        const authorMetaTag = root.querySelector('meta[name="author"]');
        const authorContent = authorMetaTag
          ? authorMetaTag.getAttribute("content")
          : "Author not found";

        // Set the SEO fields in your component state
        setSeoTitle(titleContent);
        setSeoKeywords(keywordsContent);
        setSeoAuthor(authorContent);
      } catch (error) {
        console.error(`Error fetching SEO data for ${data}: ${error.message}`);
        setSeoDescription("Error fetching SEO data");
      }
    }
    fetchSeoDescription();
  }, [data]);
  return (
    <>
      {data && (
        <div className="w-full border group rounded-lg p-4">
          <div className="w-full flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                className="w-8"
                src={data && `${data}/favicon.ico`}
                alt="favicon"
              />
              <div>
                <p color="gray" variant="h6">
                  {seoAuthor}
                </p>
                <a
                  variant="small"
                  color="gray"
                  as="a"
                  href={`${data && data}`}
                  className="font-normal text-xs"
                >
                  {`${data && data}`}
                </a>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div>
              <p variant="h5" color="blue" className="font-medium capitalize">
                {data &&
                  `${data
                    .replaceAll("https://", "")
                    .replaceAll(".com", "")
                    .replaceAll("wwww", "")}`}
              </p>
            </div>
            <div>
              <p className="line-clamp-4">{seoDescription}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
