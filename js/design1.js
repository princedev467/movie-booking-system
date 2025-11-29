const handleDisplay = async (name) => {
  console.log(name);
  localStorage.setItem("MOVIE", JSON.stringify(name));

  window.location.href = "cinema_user.html";
};

const handlecinemaDisplay = async (id) => {
  console.log(id);

  localStorage.setItem("cd", id);

  window.location.href = "cinema.html";
}
const handlecinema = async () => {
  try {
    const response = await fetch("http://localhost:3000/cinema");
    const data = await response.json();
    console.log("Cinemas:", data);

    let print = "";
    data.forEach((v) => {
      print += `
        <div class="swiper-slide"  onclick="handlecinemaDisplay('${v.id}')">
          <div class="box">
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
               
              </div>
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById("cinema_list").innerHTML = print;

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
    console.log("Error fetching cinema data:", error);
  }

};


const handlemovie = async () => {
  try {
    const response = await fetch("http://localhost:3000/movie");
    const data = await response.json();
    console.log("Movies:", data);


    const uniqueMovies = data.reduce((acc, v) => {
      if (!acc.some((x) => x.movie_name === v.movie_name)) acc.push(v);
      return acc;
    }, []);

    let print = "";
    uniqueMovies.forEach((v) => {
      print += `
        <div class="swiper-slide" onclick="handleDisplay('${v.movie_name}')">
          <div class="box1">
            <div class="imgBox">
              <img src="image/movie/${v.movie_poster}" width="100%" height="200px">
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
              <h3>${v.movie_name}</h3>
              <div class="time flex">
                <span>1 hr 20 min</span>
                <i class="fas fa-circle"></i>
              
               
              </div>
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById("movie_list").innerHTML = print;

    new Swiper(".myMovieSlider", {
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
};




// const handleregister = () => {

//   console.log("hello");

//   // window.location.
// }

const handlebtn = async () => {

  const ldata = localStorage.getItem("Login");
  console.log(ldata);


  let print = ``;

  if (ldata === "true") {
    print = print + `
    <a class="button2"  onclick="handlelogout()">Sign out</a>
    
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
  handlecinema();
  handlemovie();
  handlebtn();
};
