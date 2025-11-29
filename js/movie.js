const handleMovieDisplay = async () => {
  try {
    const response = await fetch(`http://localhost:3000/movie`);
    const data = await response.json();

    console.log("Fetched data:", data);

   
    const uniqueMovies = data.reduce((acc, movie) => {
      if (!acc.some(m => m.movie_name === movie.movie_name)) {
        acc.push(movie);
      }
      return acc;
    }, []);

    console.log("Unique movies:", uniqueMovies);

    let html = "";

    uniqueMovies.forEach(movie => {
      html += `
    
          <div class="box1">
            <div class="imgBox">
              <img src="image/movie/${movie.movie_poster}" width="50" height="50">
              <div class="icon">
                <i class="far fa-heart"></i>
                <i class="fas fa-share-alt"></i>
                <i class="fas fa-plus"></i>
              </div>
            </div>
  
            <div class="content">
              <i id="playbtn" class="fas fa-play"></i>
            </div>
  
            <div class="text">
              <h3>${movie.movie_name}</h3>
              <div class="time flex">
                <span>1 hr 20 min</span>
                <i class="fas fa-circle"></i>
               
              </div>
            </div>
          </div>
        `;
    });

    document.getElementById('movie_info').innerHTML = html;

  } catch (error) {
    console.error("Error loading movie list:", error);
  }
};

const handlecinema = async () => {
  try {
    const response = await fetch("http://localhost:3000/cinema");
    const data = await response.json();
    console.log("Cinemas:", data);

    let print = "";
    data.forEach((v) => {
      print += `
      
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
      
      `;
    });

    document.getElementById("cinema_list").innerHTML = print;

   
  } catch (error) {
    console.log("Error fetching cinema data:", error);
  }
};

window.onload = () => {
  handleMovieDisplay();
  handlecinema();
};
