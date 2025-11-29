const handlelogin = async () => {
    try {~
        event.preventDefault();
        const response = await fetch("http://localhost:3000/User");
        const data = await response.json();

        console.log(data);

        const ldata = localStorage.getItem("Login");
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;


        console.log(email, password);

        const muser = data.find((v) => v.user_email === email && v.user_password === password);
        console.log(muser);

     let   user_id=muser.id;
     console.log(user_id);

     localStorage.setItem("User_id",user_id);
     

        if (muser) {
            window.location.href = "design.html";

            alert("Login Successful!");

            localStorage.setItem("Login", "true");



        } else {
            alert("Invalid Email or Password!");
        }
    } catch (error) {
        console.log(error);
    }
}



const loginFm = document.getElementById("login");
loginFm.addEventListener("submit", handlelogin);

