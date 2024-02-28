const moviePageElement=document.querySelector('#moviePage');
var URL2= localStorage.getItem("objval");
try {
    const response = await fetch(`${URL2}`);
    const result = await response.json();
    
    // movie card
    moviePageElement.innerHTML=`
    <div class="movie-header">
    <div class="movie-title">
    <h1 class="movie-name">${result.Title}</h1>
    <p class="movie-Year">${result.Year}</p>
    </div>
    <div class="movie-review">
    <div class="movie-rating">IMDb Rating: ${result.imdbRating}</div>
    <div class="addfavfrommovie">Add to Favourites</div>
    </div>
    </div>
    <div class="movieElement">
    <div class="movie-image">
    <img src="${result.Poster}" alt="NA">
    </div>
    <div class="movie-info">
    <div class="movie-genre">
    </div>
    <div>${result.Plot}</div>
    <div><b>Director:</b> ${result.Director}</div>
    <div><b>Writer:</b> ${result.Actors}</div>
    </div>
    </div>
    `;
    const movieGenre=document.querySelector(".movie-genre");
    const genreVar=result.Genre.trim().split(', ');
    genreVar.forEach(val=>{
        const genreElement=document.createElement("div");
        genreElement.textContent=val;
        movieGenre.append(genreElement);
    });

    // To add to favourites from movie Page
    document.querySelector(".addfavfrommovie").addEventListener('click',()=>{
        var movies=JSON.parse(localStorage.getItem("favValue"));
        if(!movies.includes(result)) movies.push(result);
        console.log(movies);
        localStorage.setItem("favValue", JSON.stringify(movies));
    })
} catch (error) {
    console.error(error);
}    