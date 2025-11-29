

const displayCinema = (name) => {

  console.log(name);

  localStorage.setItem("MOVIE",  JSON.stringify(name));

  // window.location.href='cinemaUser.html';
  window.location.href = 'movieuser.html';

}


const handleDisplay = async () => {
  try {
    const responce = await fetch('http://localhost:3000/cinema');
    const cdata = await responce.json();

    console.log(cdata);


    let localMOVIE = JSON.parse(localStorage.getItem("MOVIE"))
    console.log(localMOVIE);


    const responce1 = await fetch(`http://localhost:3000/movie`);
    const mdata = await responce1.json();

    console.log(mdata);

    let fdata = mdata.filter((v, i) => v.movie_name === localMOVIE)

    console.log(fdata);

    const cid = fdata.map((v) => v.Cinema_id);
    console.log(cid);

    let filterdata = cdata.filter((v) => cid.includes(v.id));

    console.log(filterdata);

    let print = `
    
  
`;

    filterdata.map((v, i) => {
      print = print + `
       <div class="swiper-slide"  onclick="handleDate('${v.id}','${v.cinema_name}')" >
          <div class="box1">
            <div class="imgBox">
              <img src="image/client/${v.cinema_img}" width="50px" height="50px">
              <div class="icon">
                <i class="far fa-heart"></i>
                <i class="fas fa-share-alt"></i>
                <i class="fas fa-plus"></i>
              </div>
            </div>
            <div class="content">
              <i id="palybtn" class="fas fa-play"></i>
            </div>
            <div class="text">
                <h3>${v.cinema_name}</h3>
              <div class="time flex">
                <span>1 hr 20 min</span>
                <i class="fas fa-circle"></i>
                <a>${v.cinema_address}</a>
              </div>
            </div>
          </div>
        </div>`

    });

    document.getElementById('cinema_list').innerHTML = print;

    new Swiper(".myCinemaSlider", {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1024: { slidesPerView: 4 },
        768: { slidesPerView: 2 },
        480: { slidesPerView: 1 },
      },
      
    });
  } catch (error) {
    console.log(error);
  }
}

// dfrgre

const moviedisplay = async () => {


  let localMOVIE = JSON.parse(localStorage.getItem("MOVIE"))
  console.log(localMOVIE);


  const responce1 = await fetch(`http://localhost:3000/movie`);
  const mdata = await responce1.json();

  const uniqueMovies = mdata.reduce((acc, v) => {
    if (!acc.some((x) => x.movie_name === v.movie_name)) acc.push(v);
    return acc;
  }, []);


  let fdata = uniqueMovies.filter((v, i) => v.movie_name === localMOVIE);
  console.log(fdata);

  let print = ``;
  fdata.map((v) => {

    document.getElementById('movie_info').style.backgroundImage = `url('../image/movie/${v.movie_poster}')`;

    print += `
 
      <section class="home"  background-image: url("../image/movie/${v.movie_poster}" ) width: 100%  height: 100vh;>
     <div class="headerbg ">
      <header>
        <div class="container ">
          <div class="navbar flex1">
            <div class="logo">
              <img src="./image/movie/logo2-removebg-preview.png" alt="">
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

            <div class="subscribe flex">
              <i class="fas fa-search"></i>
              <i id="palybtn" class="fas fa-user"></i>
             <button class="button2">Sign out</button>
            </div>
          </div>
        </div>
      </header>
       <div class="home_content mtop">

        <div class="container">
          <div class="left">
            <h1>${v.movie_name}</h1>

            <div class="time flex">
              <label>R</label>
              <i class="fas fa-circle"></i>
              <span>1hrs 50mins</span>
              <i class="fas fa-circle"></i>
              <p>2021</p>
              <i class="fas fa-circle"></i>
              <button>Action</button>
            </div>

            <p>${v.movie_description}</p>
            <div class="button flex">
              <button class="btn" onclick="displayCinema('${v.movie_name}')">BOOK NOW</button>
              <i id="palybtn" class="fas fa-play"></i>
              <p>WATCH TRAILER</p>
            </div>
          </div>
        </div>
      </div>
       </div>
      </section> 
      
    
      `;
  });

  document.getElementById('movie_info').innerHTML = print;

  let p1 = `
     `
  fdata.forEach((v) => {
    p1 = p1 + `
    <div class="movie-content">
          <h1 class="movie-title">${v.movie_name}</h1>
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
          
          <div class="genre-tags">
           sdfsfd
          </div>
          
          <p class="movie-overview">${v.movie_description}</p>
          
          <div class="action-buttons">
           
            <button class="btn btn-primary" onclick="watchTrailer()">
              <i class="fas fa-play-circle"></i>
              Watch Trailer
            </button>
            <button class="btn btn-primary" onclick="addToWatchlist()">
              <i class="fas fa-plus"></i>
              Watchlist
            </button>
            <button class="btn btn-primary" onclick="shareMovie()">
              <i class="fas fa-share-alt"></i>
              Share
            </button>
          </div>
          
          <div class="director-info">
            <p class="director-label">Directed by</p>
            <p class="director-name">sfsdgsda</p>
          </div>
        </div>

  `  });

  console.log(p1);

  document.getElementById('moviedetail').innerHTML = p1;
}

const handlebtn = async () => {

  const ldata = localStorage.getItem("Login");
  console.log(ldata);


  let print = ``;

  if (ldata === "true") {
    print = print + `
    <a class="button2"  onclick="handlelogout()">Log out</a>
    
    `;


  } else {

    print = print + `
      
      <a class="button2"  onclick="handlereg()">Register</a>
    
    `;

  }

  document.getElementById('dombtn').innerHTML = print;
}

const handlereg = () => {
  window.location.href = 'register.html'

}
const handlelogout = () => {
  console.log("hello");

  const ldata = localStorage.getItem("Login");

  if (ldata === "true") {
    localStorage.setItem("Login", "false");
  } else {
    localStorage.setItem("Login", "true");
  }

  handlebtn();
}
window.onload = function () {
  handleDisplay();
  moviedisplay();
  handlebtn();
};X