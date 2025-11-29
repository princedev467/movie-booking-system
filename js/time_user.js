const handleseat = async (time_show) => {
  console.log(time_show);

  localStorage.setItem("time_show", JSON.stringify(time_show))

  window.location.href = 'seat_user.html';
}

const handleTimeshow = async () => {
  try {
    let time_id = localStorage.getItem("time_id");
    let date = localStorage.getItem("date");

    console.log("Time ID:", time_id);
    console.log("Date:", date);

    const response = await fetch(`http://localhost:3000/time/${time_id}`);
    const tdata = await response.json();

    console.log("Time Data:", tdata);

    let showTimes = tdata.Time_show || [];
    let html = "";

    showTimes.forEach((time) => {
      html += `
        <a onclick='handleseat(${JSON.stringify(time)})'>
          ${time}
        </a><br>
      `;
    });

    document.getElementById("show_data").innerHTML = html;
  }
  catch (err) {
    console.error("Error loading times:", err);
    document.getElementById("show_data").innerHTML =
      "<p style='color:red'>Failed to load time slots.</p>";
  }
};


const moviedisplay = async () => {
  let localMOVIE = JSON.parse(localStorage.getItem("MOVIE"));
  console.log(localMOVIE);

  const response = await fetch("http://localhost:3000/movie");
  const mdata = await response.json();

  console.log(mdata);

  let date = localStorage.getItem("date");
  let uniqueMovies = mdata.filter(
    (v, i, arr) => arr.findIndex((x) => x.movie_name === v.movie_name) === i
  );

  let fdata = uniqueMovies.filter((v) => v.movie_name === localMOVIE);

  if (!fdata.length) return;

  let v = fdata[0];




  let c_name = localStorage.getItem("CINEMA_Name");

  document.getElementById("movie_info").style.backgroundImage =
    `url('../image/movie/${v.movie_poster}')`;

  let print = ``;

  print = print + `
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
                  <li><a href="booking.html">My booking</a></li>
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
                <h4 class="date-title">${date}</h4>
              
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
                <i  id="palybtn" class="fas fa-play"></i>
                <p>WATCH TRAILER</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;

  document.getElementById("movie_info").innerHTML = print;



};
window.onload = function () {
  handleTimeshow();
  moviedisplay();
}