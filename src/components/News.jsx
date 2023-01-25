import React from "react";
import moment from "moment/moment";

const News = ({ news }) => {
  console.log(news);
  return (
    <div>
      {news.map((n, i) => {
        if (n.categoryLabel === "Football") {
          return (
            <>
              <a
                href={`https://www.livescore.com/${n.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className=" h-[250px] grid bg-white items-center m-2 rounded-lg">
                  {}
                  <img
                    className=""
                    src={n.mainMedia.gallery.url}
                    alt={n.mainMedia.gallery.alt}
                  />
                  <div className=" text-black m-1">
                    <span>{moment(n.publishedAt).format("yyyy-MM-DD")}</span>
                    <p className="font-bold">{n.title}</p>
                  </div>
                </div>
              </a>
            </>
          );
        }
      })}
    </div>
  );
};

export default News;
