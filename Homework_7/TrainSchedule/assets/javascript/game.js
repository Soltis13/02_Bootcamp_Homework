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

  //minutes away = (abs(current time - first time ) % frequency)
  //NextArrival currenttime + ((current time - first time ) % frequency)
  

   var HourFirstTime = childsnapshot.val().FirstTime
   var Hour = HourFirstTime.slice(0,2);
   //console.log(Hour)
   var MinFirstTime = childsnapshot.val().FirstTime
   var minutes = MinFirstTime.slice(-2);
   //console.log(minutes)
   var totalStartTime = +Hour * 60 + +minutes
   //console.log(totalStartTime)

  var Time = new Date()
  // var Arrival = childsnapshot.val().FirstTime

  var HourTime = Time.getHours() 
  //console.log(HourTime)
  var MinuteTime = Time.getMinutes()
  //console.log(MinuteTime)
  var totalCurrentTime = HourTime * 60 + MinuteTime + ( 24 * 60 )

  //console.log(totalCurrentTime)

  var freq = childsnapshot.val().Frequency

  var MinutesAway = 0 
  var Arrival  = 0

  for (var i = totalStartTime ; i < totalCurrentTime; i = i + +freq ){
    console.log(i)
    console.log(totalCurrentTime)
    console.log(+freq)

      
    
    Arrival = i + +freq
    MinutesAway = Arrival - totalCurrentTime

  }

  var NextArrivalHours =(Math.abs(Math.round(Arrival / 60) - 25)%24)
  var nah = NextArrivalHours.toString()
  var NextArrivalMinutes =(Arrival % 60)
  var nam = NextArrivalMinutes.toString()
  var NextArrival = nah + ":" + nam
console.log(MinutesAway)
console.log(NextArrival)


  // var MinutesAway = Math.abs( (HourTime + MinuteTime) - Arrival)
  // console.log(MinutesAway)





  // var CurrentTime = moment().format('LLLL');
  // var HourFirstTime = childsnapshot.val().FirstTime
  // var Hour = HourFirstTime.slice(1,3);
  // var MinFirstTime = childshapshot.val().FirstTime
  // var minutes = MinFirstTime.slice(-2);
  // console.log(Hour)
  // console.log(Minutes)

 
  // // var away = CurrentTime.moment().subtract()
  // var CurrentTime = moment().unix();
  // console.log(CurrentTime)
  


  // console.log("New line")
  // console.log("First Time" + childsnapshot.val().FirstTime)
  // var HourFirstTime =  childsnapshot.val().FirstTime.slice(0,2) * 60 * 60
  // var MinFirstTime =  childsnapshot.val().FirstTime.slice(-2) * 60
  // var SecFrequency = childsnapshot.val().Frequency * 60
  // console.log("HourFirstTime" + HourFirstTime)
  // console.log("MinFirstTime" + MinFirstTime)

  // var EstArrival = (CurrentTime - HourFirstTime - MinFirstTime ) % SecFrequency;

  // console.log(EstArrival / 60)



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



  $("#table > tbody").append("<tr> <td>" + childsnapshot.val().TrainName + "</td>" 
                      + "<td>" + childsnapshot.val().Destination + "</td>" 
                      + "<td>" + childsnapshot.val().Frequency + "</td>" 
                      + "<td>" + NextArrival + "</td>" 
                      + "<td>" + MinutesAway +  "</td> </tr>")
});
