import { getDetail , getFavoriteList , goToDetail , removeMovie } from './script.js';
let data = JSON.parse(localStorage.getItem('movieDetail'));
let detail = $('.detail-box');

//Dynamically change the title
$('title').html(data.Title);


//Render the details of movie
const displayDetail = ()=>{
    detail.html('');
    detail.append('<div class="img"><img src='+(data.Poster === "N/A" ? "img/na.png" : data.Poster)+' alt=""></div><div class="detail mx-3"><h2 class="text-success-emphasis my-3 d-inline">'+data.Title+'</h2><i title="Favorite" class="bi bi-heart-fill d-inline mx-3"></i><div class="rating"><span>IMDB : </span><span class="text-success-emphasis mx-2">'+data.imdbRating+'</span><span>Metascore : </span><span class="text-success-emphasis">'+data.Metascore+'</span></div><p>Genre : <span class="text-success-emphasis">'+data.Genre+'</span></p><p>Language : <span>'+data.Language+'</span></p><p>Released on : <span>'+data.Released+'</span></p><p>Duration : <span>'+data.Runtime+'</span></p><p>Actors : <span>'+data.Actors+'</span></p><p>Director : <span>'+data.Director+'</span></p><p>Plot : <span>'+data.Plot+'</span></p></div>')
}
displayDetail();

//check the movie whether its added to the favorite or not
const checkFavorite = (id)=>{
   try{
    let movies = JSON.parse(localStorage.getItem('favorites'));
    if(movies){
        movies.forEach((movie)=>{
            if(movie.id === id){
                $('.detail i').addClass("text-success");
            }
        })
    }
   }
   catch(error){
    console.log(error);
   }
    
}
checkFavorite(data.imdbID);

//Added the movie to favorite list on click
const addToFav = async (icon)=>{
   await icon.click( ()=>{
        if(icon.hasClass("text-success") === false){
            icon.addClass("text-success");
          try{
               let favMovie = {
                   title: data.Title,
                   id: data.imdbID
               }
            if(localStorage.getItem('favorites') === null){
                localStorage.setItem('favorites' , JSON.stringify([]));
                console.log('success')
            }   
            let favorites = JSON.parse(localStorage.getItem('favorites'));
            if(favMovie){
                favorites.push(favMovie);
                localStorage.setItem('favorites',JSON.stringify(favorites));
                alert("Add to favorite successfully.")
            }
            getFavoriteList();
            removeFav();
           }
           catch(error){
            console.log(error);
           }
        }
    })
    
}
addToFav($('.detail i'));

//Changing the favorite icon color after remove
const removeFav = ()=>{
    $('.dropdown-menu li p i').click(()=>{
        $('.detail i').removeClass("text-success");
    })
}
removeFav();

