const favouritePageElement=document.querySelector("#favourites-page");

var movieslist=JSON.parse(localStorage.getItem("favValue"));

const saveLocal=(items)=>{
    console.log('Items:', items);
    localStorage.setItem('favValue', JSON.stringify(movieslist));
}

// to display the favourites stored in localstorage
function displaymyFavourite(){
    favouritePageElement.innerHTML="";
    for(let result of movieslist) {
        console.log(result.imdbID);
        const favElement=document.createElement("div");
        favElement.classList.add("fav-element");
        favElement.innerHTML=`
        <div class="fav-info" data-id="${result.imdbID}">
        <div class="fav-image">
        <img src="${result.Poster}" alt="NA" width="70px" height="70px">
        </div>
        <div class="fav-header">
        <h1 class="fav-name">${result.Title}</h1>
        <p class="fav-Year">${result.Year}</p>
        </div>
        </div>
        <button class="remove">-</button>`;  
        favouritePageElement.append(favElement);
    }
    const removelist=document.querySelectorAll(".remove");
        removelist.forEach(ele=>{
            ele.addEventListener('click',()=>{
                const newmovielist = movieslist.filter((running) => running.imdbID !== ele.parentElement.firstElementChild.dataset.id);
                movieslist=newmovielist;
                saveLocal(movieslist);
                displaymyFavourite();
            })
        })
}

displaymyFavourite();
