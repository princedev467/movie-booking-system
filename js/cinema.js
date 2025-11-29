const displayMovie =async (id)=>{
    console.log(id);

    
localStorage.setItem("cd",id );
    window.location.href='selectmovie.html';

}

const cinemadisplay = async () => {

  let cd = localStorage.getItem("cd");
  console.log("LocalStorage ID:", cd);

  const response = await fetch("http://localhost:3000/cinema");
  const cdata = await response.json();

  // Find the selected cinema (string ID vs number ID fixed)
  let fdata = cdata.find(v => v.id == cd);

  console.log("Selected Cinema:", fdata);

  if (!fdata) {
    document.getElementById("movie_info").innerHTML = "<h2>No cinema found</h2>";
    return;
  }

  console.log(fdata);
  
  
  document.getElementById('movie_info').style.backgroundImage =
      `url('../image/client/${fdata.cinema_img}')`;

  let print = `
      <section class="home">
        <div class="headerbg">
          <header>
            <div class="container">
              <div class="navbar flex1">
                <div class="logo">
                  <img src="./image/movie/logo2-removebg-preview.png" alt="">
                </div>

                <nav>
                  <ul id="menuitem">
                    <li><a href="design.html">Home</a></li>
                    <li><a href="movie.html">Movies</a></li>
                    <li><a href="cinemalist.html">Tv Shows</a></li>
                    <li><a href="login.html">Log in</a></li>
                  </ul>
                </nav>

                <span class="fa fa-bars" onclick="menutoggle()"></span>

                <div class="subscribe flex">
                  <i class="fas fa-search"></i>
                  <i id="palybtn" class="fas fa-user"></i>
                  <button>SUBSCRIBE</button>
                </div>
              </div>
            </div>
          </header>

          <div class="home_content mtop">
            <div class="container">
              <div class="left">
                <h1>${fdata.cinema_name}</h1>

                <div class="time flex">
                  <label>R</label>
                  <i class="fas fa-circle"></i>
                  <span>1hrs 50mins</span>
                  <i class="fas fa-circle"></i>
                  <p>2021</p>
                  <i class="fas fa-circle"></i>
                  <button>Action</button>
                </div>

                <p>${fdata.cinema_address}</p>
                <div class="button flex">
              <button class="btn" onclick="displayMovie('${fdata.id}')">BOOK NOW</button>
              <i id="palybtn" class="fas fa-play"></i>
              <p>WATCH TRAILER</p>
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  `;

  document.getElementById("movie_info").innerHTML = print;

  // -------------------------
  // MOVIE DETAILS SECTION
  // -------------------------

  let p1 = `
    <div class="movie-content">
      <h1 class="movie-title">${fdata.cinema_name}</h1>
      <p class="movie-tagline">""</p>

      <div class="movie-meta">
        <div class="rating-badge">
          <i class="fas fa-star"></i>
          <span class="rating-score">9.8</span>
          <span>/10</span>
        </div>
        <span class="meta-item">PG-13</span>
        <span class="meta-item">1 hr 20min</span>
        <span class="meta-item">2025</span>
      </div>

      <div class="genre-tags"> sdfsfd </div>

      <p class="movie-overview">${fdata.cinema_address}</p>

      <div class="action-buttons">
        <button class="btn btn-primary" onclick="watchTrailer()">
          <i class="fas fa-play-circle"></i> Watch Trailer
        </button>
        <button class="btn btn-primary" onclick="addToWatchlist()">
          <i class="fas fa-plus"></i> Watchlist
        </button>
        <button class="btn btn-primary" onclick="shareMovie()">
          <i class="fas fa-share-alt"></i> Share
        </button>
      </div>

      <div class="director-info">
        <p class="director-label">Directed by</p>
        <p class="director-name">sfsdgsda</p>
      </div>
    </div>
  `;

  document.getElementById("moviedetail").innerHTML = p1;
};

window.onload = cinemadisplay;
