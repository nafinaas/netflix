const api = "api_key=6980bd2798aefaea773f8131a7b80ba7";
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
    fetchAnimation: `${base_url}/discover/movie?${api}&with_genre=16`,
    fetchDrama: `${base_url}/discover/tv?${api}&with_genre=18`,
};

// Truncate function to shorten long descriptions
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];

        var banner = document.getElementById("banner");
        var banner__title = document.getElementById("banner__title");
        var banner__description = document.getElementById("banner__description");

        banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
        banner__description.innerText = truncate(setMovie.overview, 150);
        banner__title.innerText = setMovie.name || setMovie.original_name;
    });

// Movies Rows
function createMovieRow(fetchUrl, title) {
    fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");
            row.className = "row";

            const rowTitle = document.createElement("h2");
            rowTitle.className = "row__title";
            rowTitle.innerText = title;
            row.appendChild(rowTitle);

            const rowPosters = document.createElement("div");
            rowPosters.className = "row__posters";
            row.appendChild(rowPosters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = "row__posterLarge";
                poster.src = img_url + movie.poster_path;
                rowPosters.appendChild(poster);
            });

            headrow.appendChild(row);
        });
}

// Create rows for different genres
createMovieRow(requests.fetchTrending, "Top Rated");
createMovieRow(requests.fetchActionMovies, "Action Movies");
createMovieRow(requests.fetchComedyMovies, "Comedy Movies");
createMovieRow(requests.fetchHorrorMovies, "Horror Movies");
createMovieRow(requests.fetchRomanceMovies, "Romance Movies");
createMovieRow(requests.fetchDocumentaries, "Documentaries");
createMovieRow(requests.fetchAnimation, "Animation");
createMovieRow(requests.fetchDrama, "Drama");

window.addEventListener("scroll", function () {
    var nav = document.querySelector(".nav");
    if (window.scrollY > 0) {
        nav.classList.add("active");
    } else {
        nav.classList.remove("active");
    }
});
