import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import axios from "axios";

function Home({ bookmarksList }) {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState("");
  const [searchState, setSearchState] = useState("");
  let cancelToken;

  const search = (data) => {
    setSearchState(data);
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("canceling the previos request");
    }
    cancelToken = axios.CancelToken.source();
    axios
      .post(`/search`, { search: data }, { cancelToken: cancelToken.token })
      .then((res) => {
        setBookmarks(res.data);
      });
  };

  useEffect(() => {
    if (!searchState) {
      setBookmarks(bookmarksList.data);
    }
    setIsLoading(false);
  }, [bookmarks]);

  return (
    <div>
      <Layout search={search}>
        {bookmarks.length > 0 ? (
          <div className='grid grid-cols-4 gap-4'>
            {bookmarks &&
              bookmarks.map((bookmark, index) => {
                return (
                  <div className='card relative mb-16' key={index}>
                    <div>
                      <img
                        className={` bg-gray-500 rounded-sm min-w-full h-52 object-cover ${
                          isLoading ? "animate-pulse" : ""
                        }`}
                        src={bookmark.thambnail}
                        alt=''
                      />
                    </div>
                    <div
                      style={{ width: "90%" }}
                      className='card-body p-3  -bottom-14 left-2/4 transform -translate-x-1/2 bg-green-default absolute'
                    >
                      <h3 className='text-white leading-5 font-semibold'>
                        <a href={bookmark.url}>
                          lofi hip hop radio - beats to sleep/chill
                        </a>
                      </h3>
                      <p className='text-xs text-white mt-1'>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>no data found</div>
        )}
      </Layout>
    </div>
  );
}

export default Home;
