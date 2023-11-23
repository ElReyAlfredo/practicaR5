const lastFmURL =
  "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=42e63dc7d165a3ec6915c432a9332a8f&format=json";

function getMusicData() {
  return fetch(`${lastFmURL}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.artists.artist)
    .then((artists) =>
      Promise.all(
        artists.map((artist) => {
          const deezerURL = `https://api.deezer.com/search?q='${artist.name}'`;
          return fetch(deezerURL)
            .then((response) => response.json())
            .then((data) => {
              return {
                id: artist.mbid,
                name: artist.name,
                image: data.data[0].artist.picture_medium,
                listeners: artist.listeners,
                stremeable: artist.stremeable,
              };
            });
        })
      )
    );
}

export { getMusicData };
