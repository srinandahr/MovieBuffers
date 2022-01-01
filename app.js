function sendRequest() {

    //Search Query from search bar and button click
    let searchQuery = document.getElementById("search").value;
    let filmBox = document.getElementById('film-box');
    let errorDiv = document.getElementById('error');
    clearPage();
    try {
        var counter = 0;
        //API Call with the searched query
        let films = fetch("http://www.omdbapi.com/?s=" + searchQuery + "&apikey=yourAPIKey").then(response => {
            return response.json();
        }).then(film => {
            try {
                for (var i = 0; i < film.Search.length; i++) {
                    //To add the API response as HTML Elements
                    var filmbox2 = document.createElement('div');
                    filmbox2.id = "filmbox2";
                    filmbox2.classList.add("filmbox2");
                    filmBox.appendChild(filmbox2);
                    var filmPosterHolder = document.createElement('div');
                    filmPosterHolder.id = "filmPosterHolder";
                    filmPosterHolder.classList.add("filmPosterHolder");
                    filmbox2.appendChild(filmPosterHolder);
                    var filmNameHolder = document.createElement('div');
                    filmNameHolder.id = "filmNameHolder";
                    filmNameHolder.classList.add("filmNameHolder");
                    filmbox2.appendChild(filmNameHolder);
                    var yearHolder = document.createElement('div');
                    yearHolder.id = "yearHolder";
                    yearHolder.classList.add("yearHolder");
                    filmbox2.appendChild(yearHolder);
                    var seeMoreButtonHolder = document.createElement('div');
                    seeMoreButtonHolder.id = "seeMoreButtonHolder";
                    seeMoreButtonHolder.classList.add("seeMoreButtonHolder");
                    filmbox2.appendChild(seeMoreButtonHolder);
                    var img = document.createElement('img');
                    img.src = film.Search[i].Poster;
                    img.id = "filmPosterImg"
                    filmPosterHolder.appendChild(img);
                    var title = document.createElement('div');
                    title.id = "filmTitle";
                    title.classList.add("filmTitle");
                    title.textContent = film.Search[i].Title;
                    filmNameHolder.appendChild(title);
                    var year = document.createElement('div');
                    year.id = "filmYear";
                    year.classList.add("filmYear");
                    year.textContent = "( " + film.Search[i].Year + " )";
                    yearHolder.appendChild(year);
                    var seeMoreButton = document.createElement('button');
                    seeMoreButton.id = "seeMoreButton";
                    seeMoreButton.classList.add("seeMoreButton");
                    seeMoreButton.innerHTML = "See More";
                    let windowOpen = "window.open('";
                    let windowClose = "')";
                    let imdbUrl = "https://www.imdb.com/title/";
                    seeMoreButton.setAttribute("onclick", windowOpen + imdbUrl + film.Search[i].imdbID + windowClose);
                    seeMoreButtonHolder.appendChild(seeMoreButton);
                    counter++;
                }
            }
            catch {
                if (counter === 0) {
                    var errorText = document.createElement('div');
                    errorText.textContent = "Oops! Not Found";
                    errorText.id = "errorText";
                    errorDiv.appendChild(errorText);
                }
            }
        });
    }
    catch {

    }

}
function clearPage() {
    let searchQuery = document.getElementById("search").value;
    let filmBox = document.getElementById('film-box');
    let errorDiv = document.getElementById('error');
    try {
        //To remove previous search results
        if (filmBox.children.length > 0) {
            var deleteLimit = filmBox.children.length;
            for (var i = 0; i < deleteLimit; i++) {
                let filmBox2Div = document.getElementById('filmbox2');
                filmBox.removeChild(filmBox2Div);
            }
        }
        if (errorDiv.innerHTML.indexOf("Oops") > -1) {
            let errorTextId = document.getElementById('errorText');
            errorDiv.removeChild(errorTextId);
        }
    }
    catch {

    }
}
