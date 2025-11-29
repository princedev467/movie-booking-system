let update = null;

let handleSubmit = async () => {
  event.preventDefault();

  const cinema = document.getElementById('cinema_list').value;
  const movie = document.getElementById('movie_list').value;
  const time = document.getElementById('time_list').value;
  console.log(time);
  const date = document.getElementById('tdate').value;
  console.log(date);

  const seat = document.getElementById('seat').value;
  const charge = document.getElementById('charge').value;


    let a1= [];
    for (let i = 1; i <= Number(seat); i++) {
      a1.push(i);
    }






  console.log(cinema, time, movie, seat, charge, date);



  let obj = {
    Seat: a1,
    Charge: charge,
    Cinema_id: cinema,
    Movie_id: movie,
    Time_show: time,
    TDate: date
  }

  console.log(obj);





  if (update === null) {
    try {
      const responce = await fetch('http://localhost:3000/Seat', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await responce.json();
      console.log(data);

    } catch (error) {
      console.log(error);

    }
  } else {
    try {
      const responce = await fetch(`http://localhost:3000/Seat/${update}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await responce.json();
      console.log(data);

    } catch (error) {
      console.log(error);

    }
  }

}

// =========> cinema <===============
const handlecinema = async () => {
  try {
    const responce = await fetch('http://localhost:3000/cinema');
    const data = await responce.json();

    console.log(data);

    let print = `
<option value="0">select cinema</option>
`
    data.map((v, i) => {
      print = print + `
    <option value="${v.id}">${v.cinema_name}</option>
    `;
    });

    document.getElementById('cinema_list').innerHTML = print
  } catch (error) {
    console.log(error);

  }
}


// =========> movie <===============
const handlemovie = async () => {
  try {
    const responce = await fetch(`http://localhost:3000/movie`);
    const data = await responce.json();

    console.log(data);

    let print = `
<option value="0">select movie</option>
`
    data.map((v, i) => {
      print = print + `
     <option value="${v.id}">${v.movie_name}</option>
           
     `;
    });

    document.getElementById('movie_list').innerHTML = print;


  } catch (error) {
    console.log(error);

  }
}


// =========> time <===============
const handleTime = async () => {
  try {
    const responce = await fetch('http://localhost:3000/time');
    const data = await responce.json();
    console.log(data);

    let print = `
      <option value="0"> Select Time</option>
    `;

    data.Time_show.map((v, i) => {
      print = print + `
            <option value="${v.id}">${v?.Time_show}</option>
        `
    });

    document.getElementById('time_list').innerHTML = print;
  } catch (error) {
    console.log(error);

  }
}


// ============> movie onchange event <===============
const handlechange = async () => {
  try {
    let cinema = document.getElementById('cinema_list').value;
    console.log(cinema);

    const responce = await fetch('http://localhost:3000/movie');
    const data = await responce.json();
    console.log(data);

    const mdata = data.filter((v, i) => v.Cinema_id === cinema);
    console.log(mdata);
    let print = `
       <option value="0">Select movie List </option>
      
      `
    mdata.map((v, i) => {
      print = print + `
      <option value="${v.id}">${v.movie_name}</option>
           
     `;
    });

    document.getElementById('movie_list').innerHTML = print;




  } catch (error) {
    console.log(error);

  }
}


// ============> time onchange event <===============
const handlechangemovie = async () => {
  try {
    const movie = document.getElementById('movie_list').value
    console.log(movie);


    const responce1 = await fetch('http://localhost:3000/time');
    const tdata = await responce1.json();
    console.log(tdata);

    const tddata = tdata.find((v, i) => v.Movie_id === movie);

    let print = `<option value="0">Select Time</option>`;

    console.log(tddata.Time_show);


    const ptime = tddata.Time_show;
    console.log(ptime);

    ptime.map((v, i) => {
      print = print + `
      <option value="${v}">${v}</option>   
     `;
    })
    document.getElementById('time_list').innerHTML = print;


    // pstart=tddata.time_start;
    // console.log(pstart);

    // pend=tddata.time_end;
    // console.log(pend);

    //  document.getElementById('start_date').innerHTML = print;

  } catch (error) {
    console.log(error);

  }


}



// ============> table of seat <===============
const seatlist = async () => {
  try {
    const responce = await fetch('http://localhost:3000/Seat');
    const data = await responce.json();
    console.log(data);

    let print = `
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>

              <th>Cienma</th>
                    <th>Movie</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Seat</th>
                    <th>Money</th>
                    <th>Action</th>

            </tr>
          </thead>
          <tbody>
    `



    const responce1 = await fetch('http://localhost:3000/cinema');
    const cdata = await responce1.json();

    const responce2 = await fetch(`http://localhost:3000/movie`);
    const mdata = await responce2.json();

    const responce3 = await fetch('http://localhost:3000/time');
    const tdata = await responce3.json();
    console.log(cdata);
    console.log(mdata);
    console.log(tdata);

    data.map(v => {

      const cinema_obj = cdata.find((v1) => v1.id === v.Cinema_id);
      const movie_obj = mdata.find((v2) => v2.id === v.Movie_id);
      const time_obj = tdata.find((v3) => v3.id === v.Time_show);
      console.log(cinema_obj);
      console.log(movie_obj);
      console.log(time_obj);

      print += `
        <tr>
           <td>${cinema_obj?.cinema_name}</td>
          <td>${movie_obj?.movie_name}</td>
           <td>${v?.Time_show}</td>
            <td>${v?.TDate}</td>
          <td>${v.Seat}</td>
          <td>${v.Charge}</td>
          <td>
            <a class="btn btn-danger btn-sm me-2"  onclick="handleEdit('${v.id}')">
              <i class="fa-solid fa-pen"></i>
            </a>
            <a class="btn btn-primary btn-sm me-2" onclick="handleDelete('${v.id}')">
              <i class="fa-solid fa-trash"></i>
            </a>
          </td>

        </tr>
      `;
    });

    print += `
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('disp').innerHTML = print;


  } catch (error) {
    console.log(error);

  }
}

const hanclechangetime = async () => {
  try {
    const movie = document.getElementById('movie_list').value
    console.log(movie);

    const cinema = document.getElementById('cinema_list').value
    console.log(cinema);


    const responce1 = await fetch('http://localhost:3000/time');
    const tdata = await responce1.json();
    console.log(tdata);


    const tddata = tdata.find((v) => v.Cinema_id === cinema && v.Movie_id === movie);
    console.log(tddata);

    let print = `<option value="0">Select start date</option>`;

    console.log(tddata.Time_show);

    let d1 = tddata.time_start;
    let d2 = tddata.time_end;


    console.log(d1, d2);

    const getDatesBetween = (stratdate, enddate) => {
      let dates = [];
      let currentDate = new Date(stratdate);
      while (currentDate <= enddate) {
        let formatedate = currentDate.toLocaleDateString('en-GB');

        print = print + `
        <option value="${formatedate}">${formatedate}</option> 
      
     `;
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    }

    const result = getDatesBetween(
      new Date(d1),
      new Date(d2)
    );


    document.getElementById('tdate').innerHTML = print;

    console.log(print);

  } catch (error) {

  }
}
// ============> Edit button <===============
const handleEdit = async (id) => {

  const response = await fetch("http://localhost:3000/Seat");
  const data = await response.json();

  console.log(data);

  const obj = data.find(v => v.id === id);

  console.log(obj);

  console.log(obj.Time_show);
  console.log(obj.Movie_id);
  console.log(obj.TDate);





  document.getElementById("cinema_list").value = obj.Cinema_id;
  await handlemovie();

  document.getElementById("movie_list").value = obj.Movie_id;
  await handlechangemovie();

  document.getElementById("time_list").value = obj.Time_show;
   await hanclechangetime();
  document.getElementById("tdate").value = obj.TDate;

  document.getElementById("seat").value = obj.Seat;

  document.getElementById("charge").value = obj.Charge;

  update = id;

}

// ============> Delete  button <===============
const handleDelete = async (id) => {
  console.log(id);

  try {
    const response = await fetch(`http://localhost:3000/Seat/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.log(error);

  }
}
window.onload = function () {

  handlecinema();

  seatlist();
};

const Seat_admin = document.getElementById('Seat_admin');
Seat_admin.addEventListener("submit", handleSubmit);

const date = document.getElementById("time_list");
date.addEventListener("change", hanclechangetime)