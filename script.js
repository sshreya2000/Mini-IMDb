const searchInput=document.querySelector("#search-bar input");
const searchList=document.querySelector("#search-list");
const HomePageElement=document.querySelector('#container');
const headerElement=document.querySelector('header');

const apikey="d015ca4b";
const baseUrl = 'https://www.omdbapi.com/';

// get films function with the entered value to display movie list
async function getFilms(movie_title){
    const URL=`${baseUrl}?apikey=${apikey}&s=${movie_title}&page=1`;
    try {
        const response = await fetch(`${URL}`);
        const result = await response.json();
        if(result.Response=="True") displayMovieList(result.Search);
        else {
            searchList.classList.add('hide');
            throw new Error('Enter valid Title!');
        }
      } catch (error) {
        console.error(error);
      }
}

// on every keyup getfilm function is called
searchInput.addEventListener('keyup',()=>{
    let searchvalue=(searchInput.value).trim();
    if(searchvalue.length>2){
        searchList.classList.remove('hide');
        getFilms(searchvalue);
    }
    else{
        searchList.classList.add('hide');
    }
})

// displays movie list and calls moviepage and favouritefunction
function displayMovieList(data){
    searchList.innerHTML="";
    data.forEach(element => {
        const listItem= document.createElement("div");
        listItem.classList.add("search-list-item");
        let imageSrc="";
        if(element.Poster=="N/A")imageSrc="static/Noimage.png";
        else imageSrc=element.Poster;
        listItem.innerHTML=`
            <div class="search-info" data-id="${element.imdbID}">
                <div class="search-image">
                <img src="${imageSrc}" alt="NA" width="70px" height="70px">
                </div>
                <div class="search-title">
                <h4>${element.Title}</h4>
                <p>${element.Year}</p>
                </div>
                </div>
                <div id="favourite">
                <div class="fa-solid fa-bookmark"></div>
                </div>`;
        searchList.append(listItem);
    });
    moviePage();
    favouriteFunc();
}

// clicking on particular movie it navigates to moviepage
function moviePage(){
    const searchListMovies=document.querySelectorAll(".search-info");
    searchListMovies.forEach(element=>{
        element.addEventListener('click',async()=>{
            searchList.classList.add("hide");
            searchInput.value="";
            const URL2=`${baseUrl}?apikey=${apikey}&i=${element.dataset.id}`;
            localStorage.setItem("objval", URL2);
            const newWindow = window.open("MoviePage.html", "_blank"); 
        })
    })
}

let favItems = [];

// favourite function
function favouriteFunc(){
    let favouriteElement=document.querySelectorAll("#favourite");
    favouriteElement.forEach(favEl=>{
        favEl.addEventListener('click',()=>{
            var movieslist=JSON.parse(localStorage.getItem("favValue"));
            if(movieslist==null){
                favEl.classList.add("color-change");
                addToFavourites(favEl.parentNode.firstElementChild);
            }
            else{
                favItems=movieslist;
                if(!favEl.classList.contains("color-change")){
                    favEl.classList.add("color-change");
                    addToFavourites(favEl.parentNode.firstElementChild);
                }
                else {
                    favEl.classList.remove("color-change");
                    removeFavourites(favEl.parentNode.firstElementChild);
                }
            } 
        })
    })
}

// add the movie to favourites
async function addToFavourites(movie){
    const URL3=`${baseUrl}?apikey=${apikey}&i=${movie.dataset.id}`;
    try {
        const response = await fetch(`${URL3}`);
        const result = await response.json();
        if(!favItems.includes(result))favItems.push(result);
        console.log(result);
        myfav();
    } catch (error) {
        console.error(error);
    }
}

// removes the movie from favourites
function removeFavourites(movie){
        const foundIndex = favItems.findIndex(obj => obj.imdbID === movie.dataset.id);
        favItems.splice(foundIndex, 1);
        myfav();
}
function myfav(){
    localStorage.setItem("favValue", JSON.stringify(favItems));
}