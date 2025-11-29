
const handleTime = (time, date) => {
  console.log("Selected time:", time);
  console.log("Selected date:", date);

  localStorage.setItem("date", date);
  localStorage.setItem("time_id", time);

  // Redirect after storing
  window.location.href = "time_user.html";
};


const handleDisplay = async () => {
  try {

    let c_id = localStorage.getItem("cd");
    console.log(c_id);

    let c_name = localStorage.getItem("CINEMA_Name");
    console.log(c_name);

  let localMOVIE = JSON.parse(localStorage.getItem("MOVIE"))
    console.log(localMOVIE);
    

    const responce = await fetch('http://localhost:3000/time');
    const tdata = await responce.json();

    console.log(tdata);


    const responce1 = await fetch('http://localhost:3000/movie');
    const mdata = await responce1.json();

    console.log(mdata);


    let ftdata = mdata.find((v) => v.Cinema_id === c_id && v.movie_name === localMOVIE);
    console.log(ftdata);

    localStorage.setItem("Movie_Id", ftdata.id);

    const filter_c = tdata.find((v) => v.Cinema_id === c_id && v.Movie_id === ftdata.id);
    console.log(filter_c);

    console.log(filter_c.time_start);
    console.log(filter_c.time_end);

    let d1 = filter_c.time_start;
    let d2 = filter_c.time_end;

    console.log(d1);
    console.log(d2);


    let print = ``;

    const getDatesBetween = (startDate, endDate) => {
      let dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        console.log(currentDate);
        let formattedDate = currentDate.toLocaleDateString('en-GB');
        print = print + `
      <a onclick="handleTime('${filter_c.id}','${formattedDate}')" >${formattedDate}</a>
    `
        currentDate.setDate(currentDate.getDate() + 1);

      }
      return dates;
    };

    const result = getDatesBetween(
      new Date(d1),
      new Date(d2)
    );

    document.getElementById('time_data').innerHTML = print;

    let exp1 = ``;


    exp1 = exp1 + `
   
  
  <h2>Movie Name:${localMOVIE}</h2>
<h4>Cinema Name:${c_name}</h4><br>
  `



    document.getElementById('minfo').innerHTML = exp1


  } catch (error) {
    console.log(error);

  }
}

const moviedisplay = async () => {
  let localMOVIE = JSON.parse(localStorage.getItem("MOVIE"));
console.log(localMOVIE);

  const response = await fetch("http://localhost:3000/movie");
  const mdata = await response.json();

  console.log(mdata);


  let uniqueMovies = mdata.filter(
    (v, i, arr) => arr.findIndex((x) => x.movie_name === v.movie_name) === i
  );

  let fdata = uniqueMovies.filter((v) => v.movie_name === localMOVIE);

  if (!fdata.length) return;

  let v = fdata[0];


  let c_name = localStorage.getItem("CINEMA_Name");
  console.log(c_name);


  document.getElementById("movie_info").style.backgroundImage =
    `url('../image/movie/${v.movie_poster}')`;

  document.getElementById("movie_info").innerHTML = `
    <section class="home">
      <div class="headerbg">
        <header>
          <div class="container">
            <div class="navbar flex1">
              <div class="logo">
                <img src="./image/movie/logo2-removebg-preview.png">
              </div>

              <nav>
                <ul id="menuitem">
                  <li><a href="design.html">Home</a></li>
                  <li><a href="movie.html">Movies</a></li>
                  <li><a href="cinemalist.html">Tv Shows</a></li>
                  <li><a href="booking.html">My Booking</a></li>
                </ul>
              </nav>

              <span class="fa fa-bars" onclick="menutoggle()"></span>
            </div>
          </div>
        </header>

        <div class="home_content mtop">
          <div class="container">
            <div class="left">
              <h1>${v.movie_name}</h1>
               <h3 class="cinema-title">${c_name}</h3>
              <div class="time flex">
                <label>R</label>
                <i class="fas fa-circle"></i>
                <span>1hr 50min</span>
                <i class="fas fa-circle"></i>
                <p>2021</p>
                <i class="fas fa-circle"></i>
                <button>Action</button>
              </div>

              <p>${v.movie_description}</p>

              <div class="button flex">
                <button class="btn">PLAY NOW</button>
                <i id="palybtn" class="fas fa-play"></i>
                <p>WATCH TRAILER</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;


  // let p1 = "";

  // fdata.forEach((v) => {
  //   p1 = p1 + `
  //     <div class="movie-content">
  //       <h1 class="movie-title">${v.movie_name}</h1>
  //        <h3 class="cinema-title">${c_name}</h3>
  //       <div class="movie-meta">
  //         <div class="rating-badge">
  //           <i class="fas fa-star"></i>
  //           <span class="rating-score">9.8</span>
  //           <span>/10</span>
  //         </div>
  //         <span class="meta-item">PG-13</span>
  //         <span class="meta-item">1 hr 20min</span>
  //         <span class="meta-item">2025</span>
  //       </div>
        
  //       <p class="movie-overview">${v.movie_description}</p>

  //       <div class="action-buttons">
  //         <button class="btn btn-primary" onclick="watchTrailer()">
  //           <i class="fas fa-play-circle"></i>
  //           Watch Trailer
  //         </button>
  //         <button class="btn btn-primary" onclick="addToWatchlist()">
  //           <i class="fas fa-plus"></i>
  //           Watchlist
  //         </button>
  //         <button class="btn btn-primary" onclick="shareMovie()">
  //           <i class="fas fa-share-alt"></i>
  //           Share
  //         </button>
  //       </div>

  //     </div>
  //   `;
  // });

  // document.getElementById("moviedetail").innerHTML = p1;
};


window.onload = function () {
  handleDisplay();
  moviedisplay();
};
