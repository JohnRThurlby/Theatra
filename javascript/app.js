// Developed by John R. Thurlby, March. 2018.

$(document).ready(function() {

    var gifDiv = " "
        gifImage = " "
        carouString = " " 
        carouArr = []
        usernameCheck = " "
        userpassCheck = " "
        listArr =  []
        userReq = " " 
        userZip = " "
        loginError = false
        latLong = " "
        imdbId = " " 
        showMovieid = " " 
        latitude = " "
        longitude = " "
        passZip = " " 
           
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

    var userRef = dataRef.ref().child("users");

    var wishRef = dataRef.ref().child("users/wishList");
        
    var url  = window.location.href; 
    
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
                  loginError = false
                  passZip = "32811"

                  userRef.on("value", function(data) {
 
                    if (usernameCheck != data.val().userId){
                       
                        loginError = true
                    }
                    if (userpassCheck != data.val().userPassword){
                       
                        loginError = true
                    }
                    
                    return loginError;
                   }, function (error) {
                    console.log("Error: " + error.code);
                 });
                     
                  
                  if (loginError == true) {
                  
                      msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                  } else {
                      
                      window.location.href = "Home.html?user=" + usernameCheck + "&zip=" + passZip 
                                            
                     // msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
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

    

    

    //get name input from text box
    var firstName = $("#inputFirst4").val().trim();

    if (firstName == ""){   //nothing entered in text box.
        dialogTitle = "First Name"
        dialogItem = "#addName"
        displayPopup()
        return false; // added so user cannot add a blank train name
    }
    
    //get middle initial input from text box
    var midInit = $("#inputMiddle4").val().trim();

   //get start time input from text box
    var lastName = $("#inputLast4").val().trim();
            
    if(lastName == "") {
        dialogTitle = "Last Name"
        dialogItem = "#lastName"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }
    
    //get start time input from text box
    var emailIn = $("#inputEmail").val().trim();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            
    if(emailIn == "" || ! emailIn.match(regex)) {
        dialogTitle = "Email"
        dialogItem = "#email"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }

    //get frequency input from text box
    var userZip = $("#inputZip").val().trim();
        
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
        
        var client = new XMLHttpRequest();
        client.open("GET", 'http://api.zippopotam.us/us/' + userZip, true);
        
        client.onreadystatechange = function() {
	    if(client.readyState == 4 && client.status == 404) {
            
            dialogTitle = "Zip Code"
            dialogItem = "#zipCode"
            displayPopup()
            return false; 
		    //alert(client.responseText);
    }};
    client.send();
    };
     
    

    //get start time input from text box
    var userName = $("#inputusername4").val().trim();
            
    if(userName == "") {
        dialogTitle = "User Name"
        dialogItem = "#userName"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }

    //get start time input from text box
    var userPass1 = $("#inputPassword4").val().trim();
            
    if(userPass1 == "") {
        dialogTitle = "Password"
        dialogItem = "#passWord"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }
    
    if(userPass1 === userName) {
       
        dialogTitle = "Password"
        dialogItem = "#passWord1"
        displayPopup()
        return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
    }
    
    //get start time input from text box
    var userPass2 = $("#inputPassword42").val().trim();
          
    if(userPass2 == "" || userPass2 !== userPass1) {
        dialogTitle = "Password"
        dialogItem = "#passWord2"
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

    window.location.href = "Home.html?user=" + userName + "&zip=" + userZip

    

      
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

function homePage(){
 

    var urlParams = new URLSearchParams(window.location.search);
    userReq = urlParams.get('user'); 
    userZip = urlParams.get('zip');
    console.log(userReq)

    var wishCount = 0
    var listMovie = " "
    
    wishRef.on("value", function(snapshot) {
       var wishArr = snapshotToArray(snapshot)
       for (i=0; i < wishArr.length; i++) {
          if (wishArr[i].userId = userReq) {

            listMovie = wishArr[i].movieId
            
            var queryWish = "https://api.themoviedb.org/3/movie/" + listMovie + "?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
            $.ajax({
            url: queryWish,
            method: "GET"
            }).then(function(response) {
            
            console.log(response)

            
                   
           $("#arefW" + wishCount).attr("href", "ticket.html?id=" + response.id + "&user=" + userReq + "&zip=" + userZip)
           $("#imageW" + wishCount).attr("src", "http://image.tmdb.org/t/p/w185//" + response.poster_path ); 
           $("#imageW" + wishCount).addClass("image");

           wishCount++
             
            
           })
            
          }
      }
      }, function (error) {
       console.log("Error: " + error.code);
    });
 

   
             


    var queryPopular = "https://api.themoviedb.org/3/movie/popular?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
        $.ajax({
        url: queryPopular,
        method: "GET"
    }).then(function(response) {

        
                    
        var popular = response.results; //shows results of gifs
       
        for (var i=0; i < 16; i++){
           $("#arefT" + i).attr("href", "ticket.html?id=" + popular[i].id + "&user=" + userReq + "&zip=" + userZip)
           $("#imageT" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + popular[i].poster_path ); 
           $("#imageT" + i).addClass("image");
            
        }
       })
               
    var queryCurrent = "https://api.themoviedb.org/3/movie/now_playing?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
        $.ajax({
        url: queryCurrent,
        method: "GET"
    }).then(function(response) {

        

        var current = response.results; //shows results of gifs
        for (var i=0; i < 16; i++){
            $("#arefIT" + i).attr("href", "ticket.html?id=" + current[i].id + "&user=" + userReq + "&zip=" + userZip)
            $("#imageIT" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + current[i].poster_path ); 
            $("#imageIT" + i).addClass("image");
           
         }
                                    
       
    })

        var queryUpcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=e29e30cbc015e5cd2ae3c7bf52b68816&language=en-US&page=1";
        $.ajax({
        url: queryUpcoming,
        method: "GET"
    }).then(function(response) {

        

        var upComing = response.results; //shows results of gifs

       
        for (var i=0; i < 16; i++){
            $("#arefU" + i).attr("href", "ticket.html?id=" + upComing[i].id + "&user=" + userReq + "&zip=" + userZip)
            $("#imageU" + i).attr("src", "http://image.tmdb.org/t/p/w185//" + upComing[i].poster_path ); 
            $("#imageU" + i).addClass("image");
           
         }
                               
      
    })

   };

function ticketPage() {

    
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('id'); 
    var userId = urlParams.get('user');
    var userZip = urlParams.get('zip');  
    

    var queryMovie = "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US&api_key=e29e30cbc015e5cd2ae3c7bf52b68816";
    
        $.ajax({
        url: queryMovie,
        method: "GET"
    }).then(function(response) {
       
        $("#movieTitle").text("Title: " + response.original_title)
        $("#movieRuntime").text("Run time: " + response.runtime)
    
        imdbId = response.imdb_id
        
    
        $("#movieOverview").text(response.overview)
    
        var queryTrailer = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US&api_key=e29e30cbc015e5cd2ae3c7bf52b68816";
    
        $.ajax({
        url: queryTrailer,
        method: "GET"
         }).then(function(response) {
 
        $("#movieTrail").attr("src", "https://www.youtube.com/embed/" + response.results[0].key); // still image stored into src of image
        
        })

        
        var googleAPI = "https://cors-anywhere.herokuapp.com/maps.googleapis.com/maps/api/geocode/json?/key=AIzaSyALrGs-INdG9Kio-Hhe56cxhY8atmBopz";
        var zipLookup = userZip
        
        console.log(zipLookup);

        //query the API
        $.getJSON( googleAPI, {
            address: zipLookup,
            sensor: "false"
        })
        .done(function( data ) {
            
            //append the FORMATTED ADDRESS            
            latitude = data.results[0].geometry.location.lat            
            longitude = data.results[0].geometry.location.lng

            getmovieTimes()

        })
        .fail(function( error ) {
            console.log("ERROR");
            console.log(error);
            
        });
  
        console.log("location " + latLong)
                
        
                
    });
       
        
    
    
}

$("#addTowish").on("click", function(e){
    event.preventDefault();

    var urlParams = new URLSearchParams(window.location.search);
    var movieReq = urlParams.get('id');
    var userId = urlParams.get('user');  
     
    wishRef.on("value", function(snapshot) {
        var wishlistArr = snapshotToArray(snapshot)
       
        for (i=0; i < wishlistArr.length; i++)
           {
            if (wishlistArr[i].movieId === movieReq) {
                //dialogTitle = "Wishlist"
                //dialogItem = "#wishList"
                //displayPopup()
                return false; // added so user cannot add a blank start time and must be a valid 24:00 time format
           }
        }
        }, function (error) {
       console.log("Error: " + error.code);
    });
    

    
    dataRef.ref("/users/wishList").push({
        userId: userId,
        movieId: movieReq                     
    });

    
    
});

$("#ticketPurchase").on("click", function(e){
    event.preventDefault();

    

    window.location = 'https://www.fandango.com/redirect.aspx?&mid=136253&a=11883&tid=AAKTZ&date=06-14-2011+21:50'
             
});

function snapshotToArray(snapshot) {
    var returnArr = []
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

function getwishList () {

    wishRef.on("value", function(snapshot) {
        var wishArr = snapshotToArray(snapshot)
        for (i=0; i < wishArr.length; i++) {
            if (wishArr[i].userId = userReq) {
                listArr[i] = wishArr[i].movieId
                console.log("list in for loop " + listArr)
            }
        }
        }, function (error) {
        console.log("Error: " + error.code);
     });
    } 
    
function getmovieTimes () {

    var cinemaMovieid = " " 
    var showtimes = [[]]

    var movieTheaname = " " 
    var movieTel = " "
    var movieAddress = " "
    var theResultsMulti = new Array()
    var theResultsCinema = new Array()

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
           
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/api.internationalshowtimes.com/v4/showtimes/",
                type: "GET",
                data: {
                    "movie_id": showMovieid,
                    "location": latitude + "," + longitude,
                    "distance": 8,
                              
                },
                headers: {
                    "X-API-Key": "EUAUOAydNnXrUbhrmFDD5YznDJtTT1kF",
                },
                })
                .done(function(data, textStatus, jqXHR) {
                    console.log("HTTP Request Succeeded: " + jqXHR.status);
                    console.log(data);
                    
                    cinemaMovieid = data.showtimes[0].cinema_id

                    for (i=0; i < data.showtimes.length; i++){
                        var theResults = new Array(); 
                        theResults[0] = data.showtimes[i].cinema_id
                        theResults[1] = data.showtimes[i].start_at
                        theResultsMulti.push(theResults);             
                    }
                    console.log(theResultsMulti)
                    

                    
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
                            console.log(data)
                            for (j=0; j < data.cinemas.length; j++){
                                if (cinemaMovieid == data.cinemas[j].id) {

                                    var theCinemas = new Array(); 
                                    theCinemas[0] = data.cinemas[j].id
                                    theCinemas[1] = data.cinemas[j].name
                                    theCinemas[2] = data.cinemas[j].telephone
                                    theCinemas[3] = data.cinemas[j].location.address.display_text
                                    theCinemas[4] = data.cinemas[j].location.lat
                                    theCinemas[5] = data.cinemas[j].location.lon
                                    theResultsCinema.push(theCinemas);                                   
                            }}
                           
                            console.log(theResultsCinema)
                            

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
    }
    
});


  