let selectedseat = [];
let seatdata = null;

let seats = null;



const handlebutton = (index) => {

    console.log(index);


    const bookseat = selectedseat.includes(index);

    let btn = document.getElementById("seat_" + index);
    console.log(bookseat);

    if (bookseat) {
        let i = selectedseat.findIndex(v => v === index)
        selectedseat.splice(i, 1);

        btn.classList.remove("myStyle");
    } else {

        selectedseat.push(index);
        btn.classList.add("myStyle");

    }
    console.log(selectedseat);

    let prize = seatdata.Charge * selectedseat.length
    console.log(prize);

    let seats = selectedseat.length;

    localStorage.setItem("Prize", prize);
    localStorage.setItem("Seats", selectedseat);
    console.log(seatdata);

    console.log(selectedseat.length);

    console.log(seatdata.Charge);

    let print = ``;

    print = print + `
             <p>No of Seat: ${selectedseat.length}</p><br>
            <p>Price: ${seatdata.Charge}</p><br>
            <p>Total :${seatdata.Charge * selectedseat.length}</p>
    `;

    console.log(print);
    document.getElementById('bildata').innerHTML = print;



}

const handlebookseat = async () => {

    console.log(selectedseat);

    console.log(seatdata.id);


    const responce3 = await fetch('http://localhost:3000/Seat');
    const sdata = await responce3.json();
    console.log(sdata);

    let c_id = localStorage.getItem("cd");
    console.log(c_id);

    let movie_id = localStorage.getItem("Movie_Id")
    console.log(movie_id);

    let time_show = JSON.parse(localStorage.getItem("time_show"));
    console.log(time_show);


    let prize = localStorage.getItem("Prize");
    console.log(prize);

    let seats = localStorage.getItem("Seats")
    console.log(seats);

    let user_id = localStorage.getItem("User_id");
    console.log(user_id);



    let date = localStorage.getItem("date");
    console.log(date);

    const s_filter = sdata.find((v) => v.Cinema_id === c_id && v.Movie_id === movie_id && v.Time_show === time_show);
    console.log(s_filter.Seat);

    // console.log(seats);

    s_filter.Seat.forEach((v, i) => {
        if (selectedseat.includes(i)) {
            s_filter.Seat[i] = 's';
        }
    });


    console.log(seatdata);

    const responce = await fetch(`http://localhost:3000/Seat/${s_filter.id}`, {
        method: "PUT",
        body: JSON.stringify(s_filter),
        headers: {
            "Content-Type": "application/json"
        }
    });


    const data = await responce.json();
    console.log(data);



    let obj1 = {
        Cinema_id: c_id,
        Movie_id: movie_id,
        Date: date,
        Time: time_show,
        Seats: seats,
        Prize: prize,
        User_id: user_id
    }

       const responce1 = await fetch('http://localhost:3000/Booking', {
          method: "POST",
          body: JSON.stringify(obj1),
          headers: {
            "Content-Type": "application/json"
          }
        });

}





const handleseat = async () => {

    let time_show = JSON.parse(localStorage.getItem("time_show"));
    console.log(time_show);

    let date = localStorage.getItem("date");
    console.log(date);

    let time_id = localStorage.getItem("time_id");
    console.log(time_id);


    const responce = await fetch('http://localhost:3000/cinema');
    const cdata = await responce.json();

    const response1 = await fetch("http://localhost:3000/movie");
    const mdata = await response1.json();

    const responce2 = await fetch("http://localhost:3000/time");
    const tdata = await responce2.json();

    const responce3 = await fetch('http://localhost:3000/Seat');
    const sdata = await responce3.json();
    console.log(sdata);


    let c_id = localStorage.getItem("cd");
    console.log(c_id);


    let movie_id = localStorage.getItem("Movie_Id")
    console.log(movie_id);


    const s_filter = sdata.find((v) => v.Cinema_id === c_id && v.Movie_id === movie_id && v.Time_show === time_show);

    console.log(s_filter);

    seatdata = s_filter;

    seats = s_filter.Seat;

    console.log(seats);

    let print = ``;

    seats.map((v, i) => {

        if (v === 's') {
            print = print + `
    
     <button id="seat_${i}" class="button" width="70px" height="40px"  onclick="handlebutton(${i})" disabled>${v}</button>
        `;
        } else {

            print = print + `
    
     <button id="seat_${i}" class="button3" width="70px" height="40px"  onclick="handlebutton(${i})" >${v}</button>
        `;
        }
    });

    document.getElementById('seatbtn').innerHTML = print;




    let c_name = localStorage.getItem("CINEMA_Name");
    console.log(c_name);

    let localMOVIE = JSON.parse(localStorage.getItem("MOVIE"));
    console.log(localMOVIE);


    console.log(localMOVIE);

    let p2 = ``;
    p2 = p2 + `
   
        
              <h2 class="seat-main">Movie : ${localMOVIE}</h2>
               <h3 class="seat-second">Cinema: ${c_name}</h3>
                <h4 class="seat-third">Date:  ${date}</h4>
                 <h4 class="seat-third">Time: ${time_show}</h4>
            
  `;


    document.getElementById("mdata").innerHTML = p2;

}

const handlelogin = () => {

    const ldata = localStorage.getItem("Login");


    if (ldata === "false") {
        window.location.href = 'register.html';
    }


}

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
    handleseat();
    handlelogin();
    handlebtn();
}
