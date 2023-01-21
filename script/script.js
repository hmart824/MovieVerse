let movies = [];
let searchedList = $(".search-list");
let dropdown = $('.dropdown-menu');

//Search the movies
const findMovies = async (title)=>{
   await $.get("https://www.omdbapi.com/?s="+title+"&apikey=cc0b162c", (data)=>{
    movies = data.Search;
    displayMovies();
    })
}

//Give the detail of movie
export const getDetail = async (id)=>{
   await $.get("https://www.omdbapi.com/?i="+id+"&apikey=cc0b162c", (data)=>{
    localStorage.setItem('movieDetail', JSON.stringify(data));
    })
}

//Take user input
const takeInput = ()=>{
    $('.search-input input').keyup(()=>{
        let value = $('.search-input input').val().trim();
        findMovies(value);
    });
    searchedList.hide();
}
takeInput();

//Get favorite movies list and rendered them
export const getFavoriteList = ()=>{
    try{
        dropdown.html('<p> No Data </p>');
        let list = JSON.parse(localStorage.getItem('favorites'));
        if(list.length > 0){
            dropdown.html('');
            list.forEach((el)=>{
            dropdown.append('<li><p><i class="bi bi-x-circle" id='+el.id+'></i><span data-id='+el.id+'>'+el.title+'</span></p></li>')
        }) 
        $('.dropdown-menu li p span').click((e)=>{
            goToDetail(e.target.dataset.id)
        })
        $('.dropdown-menu li p i').click((e)=>{
            removeMovie(e.target.id);
            alert("Removed successfully.")
            getFavoriteList();
        })
        }
    }
    catch(error){
        console.log(error);
    }
}
getFavoriteList();


//Render the searched results
const displayMovies = ()=>{
    if(movies?.length > 0){
        searchedList.show();
        searchedList.html('');
        movies.forEach((movie)=>{
            searchedList.append('<div class="movie d-flex" data-id='+movie.imdbID+'><img src='+(movie.Poster === "N/A" ? "img/na.png" : movie.Poster)+' alt=""><div class="movie-title"><p>'+ movie.Title +'</p><p>'+ movie.Year +'</p></div></div>')
        })
    }
    $('.search-list').children().on('click', (e)=>{
        goToDetail(e.target.dataset.id)
    })
}


//Redirect to the detail page 
export const goToDetail = async(id)=>{
    await getDetail(id);
    window.location.href = "detail.html";
}

//Remove movie from favorite list
export const removeMovie = (id)=>{
    let favMovieList = JSON.parse(localStorage.getItem('favorites'));
    let newList = favMovieList.filter( movie => movie.id != id )
    localStorage.setItem('favorites', JSON.stringify(newList));
}
