
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBYrh4ZGpoapFk0gS0d0JGONVJqSqhTb38",
  authDomain: "rbxgen-online.firebaseapp.com",
  databaseURL: "https://rbxgen-online-default-rtdb.firebaseio.com",
  projectId: "rbxgen-online",
  storageBucket: "rbxgen-online.appspot.com",
  messagingSenderId: "179947108334",
  appId: "1:179947108334:web:54efb17d969d5d54dbc0ff"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  points = 0
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Invalid')
    return
    // Don't continue running the code
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      roblox_user : full_name,
      last_login : Date.now(),
     points : 0
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Has Been Created')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


function logout(){
  firebase.auth().signOut();
  alert('You Have Been Logged Out')
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Invalid')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("content_container").style.display = "none";
    document.getElementById("math").style.display = "none";
    document.getElementById("redeem_page").style.display = "none";
    var user = firebase.auth().currentUser;
   console.log(user.uid);
   
var ref = firebase.database().ref('users/'+ user.uid +'/points');

ref.on("value", function(snapshot) {
   console.log(snapshot.val());
   
    document.getElementById("points").innerHTML = snapshot.val();
}, function (error) {
   console.log("Error: " + error.code);
   
});

   if(user != null){
           var email = user.email;
                document.getElementById("user_para").innerHTML = "Welcome : " + email;
              
   
   }
  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("content_container").style.display = "block";

    document.getElementById("math").style.display = "none";
    document.getElementById("redeem_page").style.display = "none";
  }
  
});


// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    alert('')
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
function math(){

    document.getElementById("user_div").style.display = "none";
    document.getElementById("content_container").style.display = "none";
    document.getElementById("math").style.display = "block";
    document.getElementById("redeem_page").style.display = "none";
}
function redeem_page(){

    document.getElementById("user_div").style.display = "none";
    document.getElementById("content_container").style.display = "none";
    document.getElementById("math").style.display = "none";
    document.getElementById("redeem_page").style.display = "block";
}

function back(){

    document.getElementById("user_div").style.display = "block";
    document.getElementById("content_container").style.display = "none";
    document.getElementById("math").style.display = "none";
    document.getElementById("redeem_page").style.display = "none";
}
