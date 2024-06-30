import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  let arr = [
    "tranding",
    "top song",
    "hindi song",
    "mixup song",
    "punjabi song",
    "2024 song",
    "best song",
  ];
  let song = Math.floor(Math.random() * arr.length);

  const getTracks = async () => {
    setIsLoading(true);
    let data = await fetch(
      `https://v1.nocodeapi.com/tapeshchavle12/spotify/qCDTnysEkRLMmvrm/search?q=${
        keyword === "" ? song : keyword
      }&type=track`
    );
    let convertedData = await data.json();
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
    setIsLoading(false);
  };
  useEffect(() => {
    getTracks();
  }, []);

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span>M</span>usic Player
          </a>

          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className="form-control me-2 w-75 "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="row">
          {tracks.map((element) => {
            return (
              <div key={element.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                  <img
                    src={element.album.images[1].url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">
                      Artist : {element.album.artists[0].name}
                    </p>
                    <p className="card-text">
                      Release Date: {element.album.release_date}
                    </p>
                    <audio
                      className="w-100"
                      src={element.preview_url}
                      controls
                    ></audio>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Spotify API</h5>
          <p className="card-text">@copyrights</p>
          <p className="card-title">Developed by Tapesh</p>
        </div>
      </div>
    </>
  );
}

export default App;
