const handleDate = ( name) => {

  console.log(name);

localStorage.setItem("MOVIE", JSON.stringify(name));

  window.location.href = 'date_user.html';

}

const handleDisplay = async () => {
  try {


    const responce = await fetch('http://localhost:3000/cinema');
    const cdata = await responce.json();

    console.log(cdata);

     let cd = localStorage.getItem("cd");
     
  console.log("LocalStorage ID:", cd);


    const responce1 = await fetch(`http://localhost:3000/movie`);
    const mdata = await responce1.json();

    console.log(mdata);

    
    let  filterdata= mdata.filter((v)=> cd.includes(v.Cinema_id));
console.log(filterdata);

    // let fdata=mdata.filter((v,i)=>v.movie_name === localMOVIE)

    // console.log(fdata);

    // const cid=fdata.map((v)=>v.Cinema_id);
    // console.log(cid);

    // let  filterdata= cdata.filter((v)=> cid.includes(v.id));

//     console.log(filterdata);

    let print = `
    
  
`;

    filterdata.map((v, i) => {
      print = print + `
       <div class="swiper-slide"  onclick="handleDate('${v.movie_name}')" >
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

window.onload = function () {
  handleDisplay();
  //   moviedisplay();
};