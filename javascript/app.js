// Developed by John R. Thurlby, March/April. 2018.

$(document).ready(function() {

    // Global variables
    var gifDiv = " "
        gifImage = " "
        carouString = " " 
        carouArr = []
        usernameCheck = " "
        userpassCheck = " "
        listArr =  []
        userReq = " " 
        userZip = " "
        userPass = " " 
        loginError = false
        latLong = " "
        imdbId = " " 
        showMovieid = " " 
        latitude = " "
        longitude = " "
        passZip = " " 
        googleLat = " "
        googleLong = " " 
           
        // Initialize Firebase
	var config = {
		apiKey: "AIzaSyDrx5HgfNPm6bCsedzhCHGhS1qDwIPmW3w",
		authDomain: "robs-ucf.firebaseapp.com",
		databaseURL: "https://robs-ucf.firebaseio.com",
		projectId: "robs-ucf",
		storageBucket: "robs-ucf.appspot.com",
		messagingSenderId: "83769074358"
      };
    
       // set Firebase variables
	firebase.initializeApp(config);

    var dataRef = firebase.database();

    var userRef = dataRef.ref().child("users");

    var wishRef = dataRef.ref().child("users/wishList");
        
    var url  = window.location.href; 

    // determine where we are
    if (url.indexOf("ticket.html") >= 0) {
       ticketPage()
    }
    if (url.indexOf("Home.html") >= 0) {
        homePage()
     }

$(function(){
// get posters from the movieDB api to populate welcome page
    
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&primary_release_date.gte=2018-03-01&primary_release_date.lte=2018-04-30";
        $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var results = response.results; 
                                        
        for (var i=0; i < results.length; i++){    // loop thru response to get posters
                
            $("#image" + i).attr("src", "http://image.tmdb.org/t/p/w342//" + results[i].poster_path ); 
            $("#image" + i).addClass("image");
                
        }
    
})

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
     
      return false;
    });
    // logon modal
    $(function() {
    
      var $formLogin = $('#login-form');
      var $formLost = $('#lost-form');
      var $formRegister = $('#register-form');
      var $divForms = $('#div-forms');
      var $modalAnimateTime = 300;
      var $msgAnimateTime = 150;
      var $msgShowTime = 2000;
        // user hits login, check user id and passowrd  against what is in local storage
      $("form").submit(function () {
          switch(this.id) {
              case "login-form":
                  var $lg_username=$('#login_username').val();
                  usernameCheck = $('#login_username').val();
                  var $lg_password=$('#login_password').val();
                  userpassCheck = $('#login_password').val();
                  loginError = false

                  userReq = localStorage.getItem('userid');
                  userPass = localStorage.getItem('password');
                         
                // check userid and password
                  if (usernameCheck != userReq){
                    loginError = true
                  }
                  if (userpassCheck != userPass){
                     loginError = true
                  }
                  
                  // no match on either, so show error
                  if (loginError == true) {
                  
                      msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                  } else {
                      
                    //good userid, password, so go to main movie carousel page
                      window.location.href = "Home.html" 
                                            
                     // msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                  }
                  return false;
                  break;
                  // lost email. reuires emai to be populated
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

// back button pressed on ticket movie page
$("#backBtn").on("click", function(event){

    event.preventDefault();
    window.location.href = "Home.html"  

});

// close button pressed on profile dialog box, close dialog
$(".closeButton").on("click", function(event){
    event.preventDefault();
    $(dialogItem).dialog('close');
    
});

// sign up function
$("#signUp").on("click", function(event){

    event.preventDefault();    

    //get first name input from text box
    var firstName = $("#inputFirst4").val().trim();

    //nothing entered in text box.
    if (firstName == ""){   
        dialogTitle = "First Name"
        dialogItem = "#addName"
        displayPopup()
        return false; // added so user cannot add a blank first name
    }
    
    //get middle name input from text box. no validation as some people do not have middle names
    var midInit = $("#inputMiddle4").val().trim();

   //get last name input from text box
    var lastName = $("#inputLast4").val().trim();

     //nothing entered in text box.       
    if(lastName == "") { 
        dialogTitle = "Last Name"
        dialogItem = "#lastName"
        displayPopup()
        return false; // added so user cannot add a blank last name 
    }
    
    //get semail input from text box
    var emailIn = $("#inputEmail").val().trim();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    //nothing entered in text box or email not in correct email format.
    if(emailIn == "" || ! emailIn.match(regex)) {  
        dialogTitle = "Email"
        dialogItem = "#email"
        displayPopup()
        return false; // added so user cannot add a blank email or or incorrect format email
    }

    //get zip input from text box
    var userZip = $("#inputZip").val().trim();
    
     //nothing entered in text box.
    if (userZip == ""){  
        dialogTitle = "Zip Code"
        dialogItem = "#zipCode"
        displayPopup()
        return false; // added so user cannot add a blank zip
    }
    else if ( $.isNumeric(userZip) != true) {    
        dialogTitle = "Zip Code"
        dialogItem = "#zipCode"
        displayPopup()
        return false; // added so user must enter a numeric zip        
    }
    else {
        // added so user must enter a valid zip, call to zippopotam

        var client = new XMLHttpRequest();
        client.open("GET", 'http://api.zippopotam.us/us/' + userZip, true);
        
        client.onreadystatechange = function() {
	    if(client.readyState == 4 && client.status == 404) {   
            // not a valid zip code
            dialogTitle = "Zip Code"
            dialogItem = "#zipCode"
            displayPopup()
            return false; 
		    //alert(client.responseText);
    }};
             client.send();
    };
   
    //get user name input from text box
    var userName = $("#inputusername4").val().trim();
            
    if(userName == "") {
        dialogTitle = "User Name"
        dialogItem = "#userName"
        displayPopup()
        return false; // added so user cannot add a blank user name
    }

    //get password input from text box
    var userPass1 = $("#inputPassword4").val().trim();
     
    //password cannot be blank
    if(userPass1 == "") {               
        dialogTitle = "Password"
        dialogItem = "#passWord"
        displayPopup()
        return false; // added so user cannot add a blank password
    }
    
    //password cannot be the same as userid
    if(userPass1 === userName) {
       
        dialogTitle = "Password"
        dialogItem = "#passWord1"
        displayPopup()
        return false; // added so user cannot add a password the same as their userid
    }
    
    //get password confirmation input from text box
    var userPass2 = $("#inputPassword42").val().trim();
          
    if(userPass2 == "" || userPass2 !== userPass1) {
        dialogTitle = "Password"
        dialogItem = "#passWord2"
        displayPopup()
        return false; // added so user cannot add a blank second password and must be the same as first password
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

    // Go to main page
    localStorage.setItem('userid', userName);
    localStorage.setItem('zipcode', userZip);
    localStorage.setItem('password', userPass1);
    window.location.href = "Home.html"
      
});

// Function to display dialog boxes for mostly errors
function displayPopup() {
    
    $(dialogItem).dialog({
        modal: true,
        autoOpen: false,
        title: dialogTitle,
        width: 400,
        height: 150
    });
    $(dialogItem).dialog('open');
    
}

// main movie page function
function homePage(){

    //get user id and zip from local storage
    userReq = localStorage.getItem('userid');
    userZip = localStorage.getItem('zipcode');
    console.log("from local " + userReq)
    console.log("from local " + userZip)

    var wishCount = 0
    var listMovie = " "
    wishArr = " " 
    
    // get wish list for user
    wishRef.on("value", function(snapshot) {

       var wishArr = snapshotToArray(snapshot)
       // go thru users wishlist. 
       for (i=0; i < wishArr.length; i++) {

        // must match userid 
          if (wishArr[i].userId === userReq) {
            
            listMovie = wishArr[i].movieId
            // retrieve movie info fro themoviedb for users wishlist. this gets one at a time.
            var queryWish = "https://api.themoviedb.org/3/movie/" + listMovie + "?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
            $.ajax({
            url: queryWish,
            method: "GET"
            }).then(function(response) {
            // add movieid to local storage
            localStorage.setItem('movie', response.id);
         
            $("#arefW" + wishCount).attr("href", "ticket.html?id=" + response.id) 
            $("#imageW" + wishCount).attr("src", "http://image.tmdb.org/t/p/w185//" + response.poster_path ); 
            $("#imageW" + wishCount).addClass("image");
            wishCount++
          })
        }
      }
      }, function (error) {
       console.log("Error: " + error.code);
    });
    // if users has less than 9 movie in wishlist, turn off carousel scrolling
    if ( wishCount < 9 ){ 
        $(".carousel-control-prev").empty()
        $(".carousel-control-next").empty()
        $("#carouselExampleIndicators1").attr("data-interval", "false")
    }
 // retrieve movie info fro themoviedb for popular movies. returns first twenty
    var queryPopular = "https://api.themoviedb.org/3/movie/popular?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
        $.ajax({
        url: queryPopular,
        method: "GET"
    }).then(function(response) {
                    
        var popular = response.results; //shows results of gifs
       // assign 16 to carousel so have full carousels
        for (var i=0; i < 16; i++){
           $("#arefT" + i).attr("href", "ticket.html?id=" + popular[i].id)
           $("#imageT" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + popular[i].poster_path ); 
           $("#imageT" + i).addClass("image");
        }
       })
    // retrieve movie info fro themoviedb for now playing.  returns first twenty         
    var queryCurrent = "https://api.themoviedb.org/3/movie/now_playing?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
        $.ajax({
        url: queryCurrent,
        method: "GET"
    }).then(function(response) {
  
        var current = response.results; //shows results of gifs
         // assign 16 to carousel so have full carousels
        for (var i=0; i < 16; i++){
            $("#arefIT" + i).attr("href", "ticket.html?id=" + current[i].id)
            $("#imageIT" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + current[i].poster_path ); 
            $("#imageIT" + i).addClass("image");
        }
    })
// retrieve movie info fro themoviedb for upcoming movies. returns first twenty
        var queryUpcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
        $.ajax({
        url: queryUpcoming,
        method: "GET"
    }).then(function(response) {
       
        var upComing = response.results; //shows results of gifs

        // assign 16 to carousel so have full carousels
        for (var i=0; i < 16; i++){
            $("#arefU" + i).attr("href", "ticket.html?id=" + upComing[i].id)
            $("#imageU" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + upComing[i].poster_path ); 
            $("#imageU" + i).addClass("image");
        }
    })
   };
// function for ticket page
function ticketPage() {

    // get info from loacl storage
    userId = localStorage.getItem('userid');
    userZip = localStorage.getItem('zipcode');
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('id'); 
    
   
    //hide buttons if possibly no data to display. Temp disabled 
    for (i=0; i < 6; i++ ){
        $("#ticketPurchase" + i).hide()
        $("#dropdownMenuButton" + i).hide()
    }

    //get user requested movie
    var queryMovie = "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US&api_key=e29e30cbc015e5cd2ae3c7bf52b68816";
    
        $.ajax({
        url: queryMovie,
        method: "GET"
    }).then(function(response) {
       
        //assign title and runtime
        $("#movieTitle").text("Title: " + response.original_title)
        $("#movieRuntime").text("Run time: " + response.runtime)
    //t+ssign movie if+d from imdb
        imdbId = response.imdb_id
            
        $("#movieOverview").text(response.overview)
    //get the youtube video to populate on trailer section
        var queryTrailer = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US&api_key=e29e30cbc015e5cd2ae3c7bf52b68816";
    
        $.ajax({
        url: queryTrailer,
        method: "GET"
         }).then(function(response) {
 
        $("#movieTrail").attr("src", "https://www.youtube.com/embed/" + response.results[0].key); // still image stored into src of image
        
        })

        //get the youtube video to populate on trailer section
        var googleAPI = "https://cors-anywhere.herokuapp.com/maps.googleapis.com/maps/api/geocode/json?/key=AIzaSyALrGs-INdG9Kio-Hhe56cxhY8atmBopz";
        var zipLookup = userZip
        
        //query the API to get latitude and longitude based on zip code
        $.getJSON( googleAPI, {
            address: zipLookup,
            sensor: "false"
        })
        .done(function( data ) {
            
            //append the FORMATTED ADDRESS            
            latitude = data.results[0].geometry.location.lat            
            longitude = data.results[0].geometry.location.lng
            // get movie info for cinemas and showtimes
            getmovieTimes()

        })
        .fail(function( error ) {
            console.log("ERROR");
            console.log(error);
            
        });
      });
  
}
// add to users wishlist if they pressed the wishlist button
$("#addTowish").on("click", function(e){
    event.preventDefault();

    userId = localStorage.getItem('userid');
    var urlParams = new URLSearchParams(window.location.search);
    var movieReq = urlParams.get('id');
      
    var wishListfound = true
        
    //get uwishlist from db 
    wishRef.on("value", function(snapshot) {
        var wishlistArr = snapshotToArray(snapshot)

        //users wishlist not found yet. added to stop from child added situation
        if (wishListfound == true) {
            //loop thru wishlist
            for ( i = 0; i < wishlistArr.length; i++)
            {
                // wishlist userid matches current userid
                if (wishlistArr[i].userId === userId) {
                   
                //match on users selected movie, so popup for already exists
                    if (wishlistArr[i].movieId === movieReq) {
                        dialogTitle = "Wishlist"
                        dialogItem = "#wishList"
                        displayPopup()
                        wishListfound = false
                        
                    }   
                }
            }
            //no match on users selected movie, so add movie to wishlist and popup for added
            if ( wishListfound == true) {
                wishListfound = false

                dataRef.ref("/users/wishList").push({
                userId: userId,
                movieId: movieReq                     
            });
            
            dialogTitle = "Wishlist"
            dialogItem = "#wishListadd"
            displayPopup()
            
            }
        }
        }, function (error) {
       console.log("Error: " + error.code);
    });
  
});
//function to add ticket via fandango if we had the time
$("#ticketPurchase").on("click", function(e){
    event.preventDefault();
    // window.location = 'https://www.fandango.com/redirect.aspx?&mid=136253&a=11883&tid=AAKTZ&date=06-14-2011+21:50'
       
});
// function change snapshot into object
function snapshotToArray(snapshot) {
    var returnArr = []
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};
// function  to get mi+ovie theaters and showtimes from international showtimes movie api
function getmovieTimes () {

    var cinemaMovieid = " " 
    var showtimes = [[]]
    var movieTheaname = " " 
    var movieTel = " "
    var movieAddress = " "
    var theResultsMulti = new Array()
    var theResultsCinema = new Array()
    var cinemaCount = 0
    var cinemasId = []

    //  get movie based on imDB movie id
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/api.internationalshowtimes.com/v4/movies/",
        type: "GET",
        data: {
            "imdb_id": imdbId,
            "fields": "id",
        },
        headers: {
            "X-API-Key": "EUAUOAydNnXrUbhrmFDD5YznDJtTT1kF",
        },
        })
        .done(function(data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            
            showMovieid = data.movies[0].id
            
           //  get showtimes based on movie id and location(lat/long), this also returns cinema id
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/api.internationalshowtimes.com/v4/showtimes/",
                type: "GET",
                data: {
                    "movie_id": showMovieid,
                    "location": latitude + "," + longitude,
                    "distance": 10,
                              
                },
                headers: {
                    "X-API-Key": "EUAUOAydNnXrUbhrmFDD5YznDJtTT1kF",
                },
                })
                .done(function(data, textStatus, jqXHR) {
                    console.log("HTTP Request Succeeded: " + jqXHR.status);
                    
                     //  nothing returned so set msg
                    if (data.showtimes.length === 0) { 
                        $("#theaterName0").text("Movie not in theaters")
                        return}                  
                   
                    cinemaMovieid = data.showtimes[0].cinema_id
                    cinemaCount = 0

                      //  store movie times based on match with movie
                    for (i=0; i < data.showtimes.length; i++){
                        var theResults = new Array(); 
                        // store movird id and start time
                        theResults[0] = data.showtimes[i].cinema_id
                        theResults[1] = data.showtimes[i].start_at
                        theResultsMulti.push(theResults); 

                        // only store new cinema ids in array. makes processing easier later on. 
                        if (i > 0) {
                            if (data.showtimes[i].cinema_id !== data.showtimes[i-1].cinema_id) {
                            
                            cinemasId[cinemaCount] = data.showtimes[i].cinema_id
                            cinemaCount++
                            }
                        } 
                    }
                     //  store cinema info to dosplay on page                        
                    $.ajax({
                        url: "https://cors-anywhere.herokuapp.com/api.internationalshowtimes.com/v4/cinemas/",
                        type: "GET",
                        data: {
                            "cinema_id": cinemaMovieid,
                        },
                        headers: {
                            "X-API-Key": "EUAUOAydNnXrUbhrmFDD5YznDJtTT1kF",
                        },
                        })
                        .done(function(data, textStatus, jqXHR) {
                            console.log("HTTP Request Succeeded: " + jqXHR.status);
                            
                            cinemaCount = 0
                            // create cinema object with addr, name, tel, location
                            for (j=0; j < data.cinemas.length; j++){
                                if (cinemasId[cinemaCount] == data.cinemas[j].id) {

                                    var theCinemas = new Array(); 
                                    theCinemas[0] = data.cinemas[j].id
                                    theCinemas[1] = data.cinemas[j].name
                                    theCinemas[2] = data.cinemas[j].telephone
                                    theCinemas[3] = data.cinemas[j].location.address.display_text
                                    theCinemas[4] = data.cinemas[j].location.lat
                                    theCinemas[5] = data.cinemas[j].location.lon
                                    theResultsCinema.push(theCinemas);
                                    cinemaCount++                                   
                               }
                            }
                            
                            // output cinema object to page
                            for (i=0; i < theResultsCinema.length; i++ ){
                                
                                $("#theaterName" + i).text(theResultsCinema[i][1]);
                                $("#theaterTel" + i).text(theResultsCinema[i][2]);
                                $("#theaterAddr" + i).text(theResultsCinema[i][3])
                                //Pin on google map for first movie theater
                                if (i === 0){
                                  googleLat = theResultsCinema[i][4]
                                  googleLong = theResultsCinema[i][5]
                                  initMap()
                                }                                  
                            }
                            
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            console.log("HTTP Request Failed");
                        })
                        .always(function() {
                            /* ... */
                        });
                   
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log("HTTP Request Failed");
                })
                .always(function() {
                    /* ... */
                });
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
        })
        .always(function() {
            /* ... */
        });
    // function to pin googl map
function initMap() {
    var myLatLng = {lat: 13.345, lng: -81.4652321};
    myLatLng.lat = googleLat   
    myLatLng.lng = googleLong
    console.log(myLatLng)
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Cinemas'
    });
    }
}
});
