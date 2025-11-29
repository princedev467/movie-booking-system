
let update = null;

const handlechange = async () => {
  try {

    const cinema = document.getElementById("cinema_list").value;

    console.log(cinema);

   let  cinema_id = cinema;
    const responce = await fetch('http://localhost:3000/movie');
    const data = await responce.json();
    console.log(data);

    const tdata = data.filter((v, i) => v.Cinema_id === cinema);
    console.log(tdata);
    let print = `
       <option value="0">Select Movie</option>
      
      `
    tdata.map((v, i) => {
      print = print + `
      <option value="${v.id}">${v.movie_name}</option>
           
     `;
    })

    document.getElementById('movie_list').innerHTML = print;

  } catch (error) {
    console.log(error);

  }
}
const handleSubmit = async () => {

  event.preventDefault();

  const cinema = document.getElementById("cinema_list").value;
  const movie = document.getElementById("movie_list").value;

  console.log(cinema, movie);

  console.log(mdata);

}

const handlecinema = async () => {
  try {
    const responce = await fetch('http://localhost:3000/cinema');
    const data = await responce.json();

    console.log(data);

  let  cdata = data;

    console.log(cdata);


    let print = `
     <option value="0">Select Cinema List </option>
      
`
    data.map((v, i) => {
      print = print + `
      <option value="${v.id}">${v.cinema_name}</option>
     `;
    });

    document.getElementById('cinema_list').innerHTML = print;

  } catch (error) {
    console.log(error);
  }
}

const handlemovie = async () => {
  try {
    const responce = await fetch(`http://localhost:3000/movie`);
    const data = await responce.json();

    console.log(data);

   

    let print = `
     <option value="0">Select Movie List</option>
      
        `;

    data.map((v, i) => {
      print = print + `
      <option value="${v.id}">${v.movie_name}</option>
           
     `;
    })
    document.getElementById('movie_list').innerHTML = print;
  } catch (error) {
    console.log(error);
  }
}



const handleTime = async () => {
  const cinema = document.getElementById("cinema_list").value;
  const movie = document.getElementById("movie_list").value;

  const start = document.getElementById('start_date').value;
  const end = document.getElementById('end_date').value

  console.log(start);
  console.log(end);


 
  const time = document.getElementsByName('time');
  let timedata = [];

  for (let i = 0; i < time.length; i++) {
    timedata.push(time[i].value);
  }
  console.log(timedata);


  let obj = {
    time_start: start,
    time_end: end,
    Cinema_id: cinema,
    Movie_id: movie,
    Time_show: timedata
  }


  console.log(obj);
  if (update === null) {
    try {
      const responce = await fetch('http://localhost:3000/time', {
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
      const responce = await fetch(`http://localhost:3000/time/${update}`, {
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

const timelist = async () => {
  try {
    const responce = await fetch('http://localhost:3000/time');
    const data = await responce.json();
    console.log(data);


    let print = `
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>

             <th>Cinema_Name</th>
             <th>Movie_Name
             </th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    `

  

const responce1 = await fetch('http://localhost:3000/cinema');
    const cdata = await responce1.json();

 const responce2 = await fetch(`http://localhost:3000/movie`);
    const mdata = await responce2.json();

      console.log(cdata);
    console.log(mdata);
    console.log(data);

    data.map(v => {

      const cinema_obj = cdata.find(v1 => v1.id == v.Cinema_id);
      const movie_obj = mdata.find(v2 => v2.id == v.Movie_id);
console.log(cinema_obj);
console.log(movie_obj);


      print += `
        <tr>
          <td>${cinema_obj?.cinema_name}</td>
          <td>${movie_obj?.movie_name}</td>
          <td>${v.time_start}</td>
          <td>${v.time_end}</td>
         
            <td>${v.Time_show}</td>
          <td>
            <a class="btn btn-danger btn-sm me-2" onclick="handledel('${v.id}')">
              <i class="fa-solid fa-trash"></i>
            </a>
            <a class="btn btn-primary btn-sm me-2" onclick="handleedit('${v.id}')">
              <i class="fa-solid fa-pen"></i>
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

const handleDisplay = (timedata = '') => { //data get
  console.log(timedata);
  if (event) {
    event.preventDefault();
  }


  let divele = document.createElement('div');

  let inpele = document.createElement('input');
  inpele.setAttribute("type", "time");
  inpele.setAttribute("name", "time");
  inpele.setAttribute("value", timedata); //set value

  let btnE = document.createElement('button');
  btnE.setAttribute("onclick", "handleDisplay()");
  btnE.textContent = '+';


  let ref = document.getElementById('add');

  ref.appendChild(divele);
  divele.appendChild(inpele);
  divele.appendChild(btnE);
  


  console.log(add.children.length);

  if (add.children.length > 0) {
    let btnD = document.createElement('button');
    btnD.addEventListener('click', function () {
      event.target.parentNode.remove();
    });
    btnD.textContent = '-';
    divele.appendChild(btnD);
  }




}
const handledel = async (id) => {
  console.log(id);

  try {
    const responce = await fetch(`http://localhost:3000/time/${id}`, {
      method: "DELETE"
    });


    const data = await responce.json();
    console.log(data);

  } catch (error) {
    console.log(error);
  }

}

const handleedit = async (id) => {
  console.log(id);
  const responce = await fetch(`http://localhost:3000/time`);
  const data = await responce.json()

  console.log(data);
  // console.log(data.cinema_id);
  

  const obj = data.find(v => v.id === id);
  console.log(obj);

  document.getElementById('start_date').value = obj.time_start;
  document.getElementById('end_date').value = obj.time_end;
  
  document.getElementById('cinema_list').value = obj.Cinema_id;
   await handlemovie();
  document.getElementById('movie_list').value = obj.Movie_id;
 

  const td = obj.Time_show;
  console.log(td);


  console.log(td.length);


  document.getElementById('add').innerHTML = ''; //empty mate

  for (let i = 0; i < td.length; i++) {
    handleDisplay(td[i]); //function data pass

  }

  update = id;
}


window.onload = function () {
  
  handlecinema();
    timelist();

};

const Time_admin = document.getElementById('Time_admin');
Time_admin.addEventListener("submit", function () {

  
    handleTime();


});

