// Developed by John R. Thurlby, March. 2018.

$(document).ready(function() {

    var gifDiv = " "
        gifImage = " "
        carouString = " " 
        carouArr = []
        usernameCheck = " "
        userpassCheck = " "

        // Initialize Firebase
	var config = {
		apiKey: "AIzaSyDrx5HgfNPm6bCsedzhCHGhS1qDwIPmW3w",
		authDomain: "robs-ucf.firebaseapp.com",
		databaseURL: "https://robs-ucf.firebaseio.com",
		projectId: "robs-ucf",
		storageBucket: "robs-ucf.appspot.com",
		messagingSenderId: "83769074358"
	  };
	firebase.initializeApp(config);

    var dataRef = firebase.database();

    var usersRef = dataRef.ref().child("users");

    var wishRef = dataRef.ref().child("wishList");
    
    var url  = window.location.href; 
    console.log(url)
    if (url.indexOf("ticket.html") >= 0) {
       ticketPage()
    }
    if (url.indexOf("Home.html") >= 0) {
        homePage()
     }

$(function(){
    // themoviedb url
        
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&primary_release_date.gte=2018-02-01&primary_release_date.lte=2018-03-31";
        $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response)

        var results = response.results; //shows results of gifs
                                        
        for (var i=0; i < results.length; i++){
                
			    $("#image" + i).attr("src", "http://image.tmdb.org/t/p/w342//" + results[i].poster_path ); 
                $("#image" + i).addClass("image");
				
            }
        
    })
    

  $(function() {
    
    // contact form animations
    $('#contact').click(function() {
      $('#contactForm').fadeToggle("slow");
    })
    $(document).mouseup(function (e) {
      var container = $("#contactForm");
  
      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          container.fadeOut() 
      }
    });
    
  });

  $(function() {
    
    // login form animations
    $('#login').click(function() {
      $('#loginForm').fadeToggle("slow");
    })
    $(document).mouseup(function (e) {
      var container = $("#loginForm");
  
      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          container.fadeOut() 
      }
    });
    
  });

    

    $( '.dropdown-menu a' ).on( 'click', function( event ) {

      var $target = $( event.currentTarget ),
          val = $target.attr( 'data-value' ),
          $inp = $target.find( 'input' ),
          idx;

      if ( ( idx = options.indexOf( val ) ) > -1 ) {
          options.splice( idx, 1 );
          setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
      } else {
          options.push( val );
          setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
      }

      $( event.target ).blur();
          
      console.log( options );
      return false;
    });

    $(function() {
    
      var $formLogin = $('#login-form');
      var $formLost = $('#lost-form');
      var $formRegister = $('#register-form');
      var $divForms = $('#div-forms');
      var $modalAnimateTime = 300;
      var $msgAnimateTime = 150;
      var $msgShowTime = 2000;
  
      $("form").submit(function () {
          switch(this.id) {
              case "login-form":
                  var $lg_username=$('#login_username').val();
                  usernameCheck = $('#login_username').val();
                  var $lg_password=$('#login_password').val();
                  userpassCheck = $('#login_password').val();
                  if ($lg_username == "ERROR") {
                      msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                  } else {
                      console.log("in login")
                      checkuserName();
                      msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                  }
                  return false;
                  break;
              case "lost-form":
                  var $ls_email=$('#lost_email').val();
                  if ($ls_email == "ERROR") {
                      msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                  } else {
                      msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                  }
                  return false;
                  break;
              case "register-form":
                  var $rg_username=$('#register_username').val();
                  var $rg_email=$('#register_email').val();
                  var $rg_password=$('#register_password').val();
                  if ($rg_username == "ERROR") {
                      msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                  } else {
                      // add passwrod check in here
                      msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                  }
                  return false;
                  break;
              default:
                  return false;
          }
          return false;
      });
      
      $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
      $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
      $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
      $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
      $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
      $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
      
      function modalAnimate ($oldForm, $newForm) {
          var $oldH = $oldForm.height();
          var $newH = $newForm.height();
          $divForms.css("height",$oldH);
          $oldForm.fadeToggle($modalAnimateTime, function(){
              $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                  $newForm.fadeToggle($modalAnimateTime);
              });
          });
      }
      
      function msgFade ($msgId, $msgText) {
          $msgId.fadeOut($msgAnimateTime, function() {
              $(this).text($msgText).fadeIn($msgAnimateTime);
          });
      }
      
      function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
          var $msgOld = $divTag.text();
          msgFade($textTag, $msgText);
          $divTag.addClass($divClass);
          $iconTag.removeClass("glyphicon-chevron-right");
          $iconTag.addClass($iconClass + " " + $divClass);
          setTimeout(function() {
              msgFade($textTag, $msgOld);
              $divTag.removeClass($divClass);
              $iconTag.addClass("glyphicon-chevron-right");
              $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
      }
  });
});

$("#signUp").on("click", function(event){
    event.preventDefault();

    console.log("in sign up")

    //get name input from text box
    firstName = $("#inputFirst4").val().trim();

    if (firstName == ""){   //nothing entered in text box.
        dialogTitle = "First Name"
        dialogItem = "#addName"
        displayPopup()
        return false; // added so user cannot add a blank train name
    }
    
    //get middle initial input from text box
    midInit = $("#inputMiddle4").val().trim();

   //get start time input from text box
    lastName = $("#inputLast4").val().trim();
            
    if(lastName == "") {
        dialogTitle = "Last Name"
        dialogItem = "#lastName"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }

    //get start time input from text box
    emailIn = $("#inputEmail").val().trim();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            
    if(emailIn == "" || ! emailIn.match(regex)) {
        dialogTitle = "Email"
        dialogItem = "#email"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }

    //get frequency input from text box
    userZip = $("#inputZip").val().trim();
        
    if (userZip == ""){   //nothing entered in text box.
        dialogTitle = "Zip Code"
        dialogItem = "#zipCode"
        displayPopup()
        return false; // added so user cannot add a blank frequency
    }
    else if ( $.isNumeric(userZip) != true) {
        dialogTitle = "Zip Code"
        dialogItem = "#zipCode"
        displayPopup()
        return false; // added so user must enter a numeric frequency        
    }
    else {
        console.log(userZip)
        var client = new XMLHttpRequest();
        client.open("GET", 'http://api.zippopotam.us/us/' + userZip, true);
        console.log("after zip  call")
        client.onreadystatechange = function() {
	    if(client.readyState == 4 && client.status == 404) {
            console.log("in ready state")
            dialogTitle = "Zip Code"
            dialogItem = "#zipCode"
            displayPopup()
            return false; 
		    //alert(client.responseText);
    }};
    client.send();
    };
    //}  

    //get start time input from text box
    userName = $("#inputusername4").val().trim();
            
    if(userName == "") {
        dialogTitle = "User Name"
        dialogItem = "#userName"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }

    //get start time input from text box
    userPass1 = $("#inputPassword4").val().trim();
            
    if(userPass1 == "") {
        dialogTitle = "Password"
        dialogItem = "#passWord"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }

    //get start time input from text box
    userPass2 = $("#inputPassword42").val().trim();
            
    if(userPass2 == "" || userPass2 !== userPass1 || userPass2 !== userName) {
        dialogTitle = "Password"
        dialogItem = "#passWord"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }
    // Push into firebase DB

    dataRef.ref("/users").push({
        firstName: firstName,
        middleInit: midInit,
        lastName: lastName,  
        email: emailIn,
        zipCode: userZip,
        userId: userName,
        userPassword: userPass1                      
    });
        
    // clear out page text boxes

    

    $("#inputFirst4").val("");
    $("#inputMiddle4").val("");
    $("#inputLast4").val("");
    $("#inputEmail").val("");
    $("#inputZip").val("");
    $("#inputusername4").val("");
    $("#inputPassword4").val("");
    $("#inputPassword42").val("");

    dialogTitle = "User Added"
    dialogItem = "#userAdded"
    displayPopup()
    
});
// Function to display dialog boxes for mostly errors
function displayPopup() {
    console.log("in display popup")
    $(dialogItem).dialog({
        modal: true,
        autoOpen: false,
        title: dialogTitle,
        width: 400,
        height: 150
    });
    $(dialogItem).dialog('open');
}

// Function to display dialog boxes for mostly errors
function checkuserName() {

    console.log("in checkUser" );
    console.log(usernameCheck);
    console.log(userpassCheck);
    
    var ref = new Firebase('https://robs-ucf.firebaseio.com/users/' + usernameCheck);
    ref.on('value', function(snapshot) {
    if (snapshot.exists())
        alert ("exist");
    else
        alert ("not exist");
    });

   var ref = new Firebase('https://robs-ucf.firebaseio.com/users/' + userpassCheck);
   ref.on('value', function(snapshot) {
   if (snapshot.exists())
       alert ("exist");
   else
       alert ("not exist");
   });
    
}

//function populate_genre() {

 //   var queryGenre = "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=e29e30cbc015e5cd2ae3c7bf52b68816";
 //       $.ajax({
 //       url: queryGenre,
 //       method: "GET"
 //   }).then(function(response) {
        
 //   var genres = response.genres; //shows results of gifs

//    console.log(response)

 //   for ( i = 0; i < genres.length; i++ ) {
 
	//$.each(genre_array_with_keys, function(val, text) {
 //  $('#genre_with_keys').append( $('<option></option>').val(genres[i].id).html(genres[i].name) ) 
   //$('.checkbox').append( $('<option></option>').val(genres[i].id).html(genres[i].name) )
//    console.log("value of i" + i)
    //}); 
 //   }
 
//    })

//}
//$('#genre_with_keys').click(function(e) {

 //   var queryGenre = "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=e29e30cbc015e5cd2ae3c7bf52b68816";
 //       $.ajax({
  //      url: queryGenre,
  //      method: "GET"
 //   }).then(function(response) {
        
 //   var genres = response.genres; //shows results of gifs

 //   console.log(response)

//    for ( i = 0; i < genres.length; i++ ) {
 
	//$.each(genre_array_with_keys, function(val, text) {
 //   $('#genre_with_keys').append( $('<option></option>').val(genres[i].id).html(genres[i].name) ) 
 //   console.log("value of i" + i)
    //}); 
 //   }
 
//    e.preventDefault();
 //   })
//});


function homePage(){
 // $("#home").on("click", function(e){
    
    event.preventDefault();

    var urlParams = new URLSearchParams(window.location.search);
    // var movieId = urlParams.get('id');
    var userId = urlParams.get('user'); 
    userId = "Robth"
    wishRef.equalTo(userId).once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            var movieId = childSnapshot.val().movieId;
        
            console.log(movieId) })

        })

            

    //var ref = new Firebase('https://robs-ucf.firebaseio.com/users/wishList');
    //ref.on('value', function(snapshot) {
    //if (snapshot.exists())
    //    alert ("exist");
    //else
    //    alert ("not exist");
    //});

   
    
    var queryWish = "https://api.themoviedb.org/3/movie/popular?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
    $.ajax({
    url: queryWish,
    method: "GET"
}).then(function(response) {

    console.log(response)
                
    var wishList = response.results; //shows results of gifs
   
    for (var i=0; i < 16; i++){
       $("#arefW" + i).attr("href", "ticket.html?id=" + wishList[i].id)
       $("#imageW" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + wishList[i].poster_path ); 
       $("#imageW" + i).addClass("image");
       //popularArr[i] = '"<a href="ticket.html"></a><img src="http://image.tmdb.org/t/p/w185//' + popular[i].poster_path 
    }
   })

    var queryPopular = "https://api.themoviedb.org/3/movie/popular?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
        $.ajax({
        url: queryPopular,
        method: "GET"
    }).then(function(response) {

        console.log(response)
                    
        var popular = response.results; //shows results of gifs
       
        for (var i=0; i < 16; i++){
           $("#arefT" + i).attr("href", "ticket.html?id=" + popular[i].id)
           $("#imageT" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + popular[i].poster_path ); 
           $("#imageT" + i).addClass("image");
           //popularArr[i] = '"<a href="ticket.html"></a><img src="http://image.tmdb.org/t/p/w185//' + popular[i].poster_path 
        }
       })
               
    var queryCurrent = "https://api.themoviedb.org/3/movie/now_playing?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=2";
        $.ajax({
        url: queryCurrent,
        method: "GET"
    }).then(function(response) {

        console.log(response)

        var current = response.results; //shows results of gifs
        for (var i=0; i < 16; i++){
            $("#arefIT" + i).attr("href", "ticket.html?id=" + current[i].id)
            $("#imageIT" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + current[i].poster_path ); 
            $("#imageIT" + i).addClass("image");
            //popularArr[i] = '"<a href="ticket.html"></a><img src="http://image.tmdb.org/t/p/w185//' + popular[i].poster_path 
         }
                                    
       
    })

        var queryUpcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=2";
        $.ajax({
        url: queryUpcoming,
        method: "GET"
    }).then(function(response) {

        console.log(response)

        var upComing = response.results; //shows results of gifs

       
        for (var i=0; i < 16; i++){
            $("#arefU" + i).attr("href", "ticket.html?id=" + upComing[i].id)
            $("#imageU" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + upComing[i].poster_path ); 
            $("#imageU" + i).addClass("image");
            //popularArr[i] = '"<a href="ticket.html"></a><img src="http://image.tmdb.org/t/p/w185//' + popular[i].poster_path 
         }
                               
      
    })

   };

function ticketPage() {
// $("#ticketPage").on("click", function(e){
    //event.preventDefault();
    
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('id'); 
    var userId = urlParams.get('user'); 
    var imdbId = " " 

    var queryMovie = "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US&api_key=e29e30cbc015e5cd2ae3c7bf52b68816";
    
        $.ajax({
        url: queryMovie,
        method: "GET"
    }).then(function(response) {
       
        $("#movieTitle").text("Title: " + response.original_title)
        $("#movieRuntime").text("Run time: " + response.runtime)
    
        imdbId = response.imdb_id
        console.log("imdb ID " + imdbId)
    
        $("#movieOverview").text(response.overview)
    
        var queryTrailer = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US&api_key=e29e30cbc015e5cd2ae3c7bf52b68816";
    
        $.ajax({
        url: queryTrailer,
        method: "GET"
         }).then(function(response) {
 
        $("#movieTrail").attr("src", "https://www.youtube.com/embed/" + response.results[0].key); // still image stored into src of image
        
        })
       
    })
    
}

$("#addTowish").on("click", function(e){
    event.preventDefault();
    console.log("in wish list")

    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('id');
    var userId = urlParams.get('user');  
    userId = "Robth"
    dataRef.ref("/users/wishList").push({
        userId: userId,
        movieId: movieId                     
    });

    
    
});

$("#ticketPurchase").on("click", function(e){
    event.preventDefault();

    console.log("in ticket purchase")

    window.location = 'https://www.fandango.com/redirect.aspx?&mid=136253&a=11883&tid=AAKTZ&date=06-14-2011+21:50'
             
});
    
});


  