const handleregister=async()=>{

    const username=document.getElementById('username').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const confirmpassword=document.getElementById('confirmPassword').value;

    console.log(username,email,password,confirmpassword);
     
    
  let formerr = false;


  if (username === '') {
    document.getElementById("nameErr").innerHTML = "please enter your name"
  } else {
    let nameRegex = /^[a-zA-Z ]+$/;
    if (nameRegex.test(username)) {
      document.getElementById("nameErr").innerHTML = "";
    } else {
      document.getElementById("nameErr").innerHTML = "please enter a valid username";
      formerr = true;
    }
  }

  if (email === '') {
    document.getElementById("emailErr").innerHTML = "please enter your email"
    formerr = true;
  } else {
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,30}$/;
    if (emailRegex.test(email)) {
      document.getElementById("emailErr").innerHTML = "";
    } else {
      document.getElementById("emailErr").innerHTML = "please enter a valid email";
    }
  }

  if (password === '') {
    document.getElementById("passErr").innerHTML = "please enter your password";
    formerr = true;
  } else {
         document.getElementById("passErr").innerHTML = "";
    } 

 if (password !== confirmpassword) {
   
    document.getElementById("conpassErr").innerHTML = "your password is incorect";
    formerr = true;
  } else {
    document.getElementById("conpassErr").innerHTML = "";
  }

     if (!formerr) {
    let obj = {
      user_name: username,
      user_email: email,
      user_password: password,
      
    }

    console.log(obj);

      try {
        const responce = await fetch('http://localhost:3000/User', {
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
    }
  // window.location.href = 'login.html';
  }

 


    
    
    
    
    
    
  
     
        


       
