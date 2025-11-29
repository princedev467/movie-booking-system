const handleBooking = async () => {

    const responce = await fetch('http://localhost:3000/Booking');
    const udata = await responce.json();

    console.log(udata);

    const response1 = await fetch(`http://localhost:3000/movie`);
    const mdata = await response1.json();

    const responce2 = await fetch('http://localhost:3000/cinema');
    const cdata = await responce2.json();


    let c_name = localStorage.getItem("CINEMA_Name");
    console.log(c_name);

    let localMOVIE = JSON.parse(localStorage.getItem("MOVIE"));
    console.log(localMOVIE);




    let user_id = localStorage.getItem("User_id");
    console.log(user_id);

    let filter_user = udata.filter((v) => v.User_id === user_id);
    console.log(filter_user);

    let print = ``;

    filter_user.map((v, i) => {

        let filter_image = mdata.find((v1) => v1.id === v.Movie_id);
        console.log(filter_image);

        let filter_c = cdata.find((v2) => v2.id === v.Cinema_id);

        print = print + `
         <div class="user_data">
         <td>
        <img src="image/movie/${filter_image.movie_poster}"  width="90px" height="90px" >
    </td>
     
     
      <h3>${filter_image.movie_name}</h3>
       <h3>${filter_c.cinema_name}</h3>
      <h3>${v.Date}</h3>
      <h3>${v.Time}</h3>
      <h3>${v.Seats}</h3>
      <h3>${v.Prize}</h3>
     
   </div>
        `;
    });

    document.getElementById('user_info').innerHTML = print;

    console.log(print);

}

window.onload = () => {
    handleBooking();
};