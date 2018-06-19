  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC5zdDcMvII0JgaWYyeIFDmwDZdIg1c1dU",
    authDomain: "webdevbootcamp-e63f7.firebaseapp.com",
    databaseURL: "https://webdevbootcamp-e63f7.firebaseio.com",
    projectId: "webdevbootcamp-e63f7",
    storageBucket: "",
    messagingSenderId: "686459628072"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Initial Values

var objdata = {

    TrainName: "",
    Destination: "",
    Frequency: 0,
    NextArrival: 0,
    MinutesAway: 0,
    FirstTime: 0,
    
}

  // Capture Button Click
  $("#submit").on("click", function(event) {
    console.log("You clicked the button")
     // Don't refresh the page!
     event.preventDefault();
 
     objdata.TrainName = $("#TrainName").val().trim();
     objdata.Destination = $("#Destination").val().trim();
     objdata.FirstTime= $("#FirstTime").val().trim();
     objdata.Frequency = $("#Frequency").val().trim();
 
     database.ref().push({
       TrainName: objdata.TrainName,
       Destination: objdata.Destination,
       FirstTime: objdata.FirstTime,
       Frequency: objdata.Frequency
     });
 
    
 });

 var a = 0;
database.ref().on("child_added", function(childsnapshot){       
    a++;
  console.log(a)
  //console.log(childsnapshot.val().TrainName);
  //console.log(childsnapshot.val().Destination)
  //console.log(childsnapshot.val().FirstTime)
  //console.log(childsnapshot.val().Frequency)

  //minutes away = ((current time - first time ) % frequency)
  //NextArrival currenttime + ((current time - first time ) % frequency)
  
  var CurrentTime = moment().unix();
  console.log(CurrentTime)
  


  console.log("New line")
  console.log("First Time" + childsnapshot.val().FirstTime)
  var HourFirstTime =  childsnapshot.val().FirstTime.slice(0,2) * 60 * 60
  var MinFirstTime =  childsnapshot.val().FirstTime.slice(-2) * 60
  var SecFrequency = childsnapshot.val().Frequency * 60
  console.log("HourFirstTime" + HourFirstTime)
  console.log("MinFirstTime" + MinFirstTime)

  var EstArrival = (CurrentTime - HourFirstTime - MinFirstTime ) % SecFrequency;

  console.log(EstArrival / 60)



  // var CurrentTime = moment().format('LT');
  // console.log("currentTIme" + CurrentTime)

  // var NextArrival = (moment().subtract(HourFirstTime, 'hour').subtract(MinFirstTime, 'minute'));
  // //NextArrival = moment().add(MinFirstTime, 'minute');
  // NextArrival = NextArrival.format('LT');
  // console.log(NextArrival)
  // // var HourCurrentTime =  CurrentTime.slice(0,2)
  // // var MinCurrentTime =  CurrentTime.slice(-2)
  // // console.log("HourCurrentTime" + HourCurrentTime)
  // // console.log("MinCurrentTime" + MinCurrentTime)

  // // var away = CurrentTime.moment().subtract()

      
  var MinutesAway
  var NextArrival



  $("#table > tbody").append("<tr> <td>" + childsnapshot.val().TrainName + "</td>" 
                      + "<td>" + childsnapshot.val().Destination + "</td>" 
                      + "<td>" + childsnapshot.val().Frequency + "</td>" 
                      + "<td>" + NextArrival + "</td>" 
                      + "<td>" + MinutesAway +  "</td> </tr>")
});
