
		// Assume the following situations.

		// (TEST 1)
		// First Train of the Day is 3:00 AM
		// Assume Train comes every 3 minutes.
		// Assume the current time is 3:16 AM....
		// What time would the next train be...?
		// (Use your brain first)
		// It would be 3:18 -- 2 minutes away

		// (TEST 2)
		// First Train of the Day is 3:00 AM
		// Assume Train comes every 7 minutes.
		// Assume the current time is 3:16 AM....
		// What time would the next train be...? (Use your brain first)
		// It would be 3:21 -- 5 minutes away


		// ==========================================================

		// Solved Mathematically
		// Test case 1:
		// 16 - 00 = 16
		// 16 % 3 = 1 (Modulus is the remainder)
		// 3 - 1 = 2 minutes away
		// 2 + 3:16 = 3:18

		// Solved Mathematically
		// Test case 2:
		// 16 - 00 = 16
		// 16 % 7 = 2 (Modulus is the remainder)
		// 7 - 2 = 5 minutes away
		// 5 + 3:16 = 3:21

		// Assumptions
	/*function nextTrainTime(firsttraintime){
		
		var tFrequency = 3;
		var firstTime = firsttraintime;//"03:30"; // Time is 3:30 AM

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % tFrequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = tFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
		return false;

}; */

// 1. Link to Firebase
var trainData = new Firebase("https://trainsched20160618.firebaseio.com/");
// 2. Button for adding Train info
$(document).ready(function(){
	$(document).on("click", "#submitInfo", function(){
		
		// Grabs user input
		var trainName = $("#trainName").val().trim();
		var destination = $("#destination").val().trim();
		
		console.log($("#firstTrain").val());
		var firstTrain=$("#firstTrain").val().trim();
		console.log(firstTrain);
		
		var frequency = $("#frequency").val().trim();
		// Creates local "temporary" object for holding train data
		var newTrainInfo = {
			trainname:  trainName,
			destination: destination,
			firsttraintime: firstTrain,
			frequency: frequency
		}
		// Uploads train data to the database
		trainData.push(newTrainInfo);
		
		// Alert
		alert("Train info successfully added");
		// Clears all of the text-boxes
		$("#trainName").val("");
		$("#destination").val("");
		$("#firstTrain").val("");
		$("#frequency").val("");

		// Prevents moving to new page
		return false;

	});

	// 3. Create Firebase event for adding train to the database 
	//and a row in the html when a user adds an entry
	trainData.on("child_added", function(childSnapshot, prevChildKey){

		//console.log(childSnapshot.val());

		// Store everything into a variable.
		var trainName = childSnapshot.val().trainname;
		var destination = childSnapshot.val().destination;
		var firsttraintime = childSnapshot.val().firsttraintime;
		var frequency = childSnapshot.val().frequency;

		var tableRow = $("<tr>");
		
		var tableData1 = $("<td>");
		tableData1.html(trainName);
		
		//console.log( tableData1.html());
		var tableData2 = $("<td>");
		tableData2.html(destination);
		var tableData3 = $("<td>");
		tableData3.html(frequency);
		
		var tableData4 = $("<td>");
		//tableData4.html(frequency);
		var tableData5 = $("<td>");

		var tFrequency = frequency;
		// First Time (pushed back 1 year to make sure it comes before current time to avoid negative numbers)
		//var firstTimeConverted = moment(firsttraintime,"hh:mm").subtract(1, "years");
		var firstTimeConverted = moment(firsttraintime,"hh:mm").subtract(1, "years");
		//console.log(firsttraintime);
		//console.log("First TIME: " +  firstTimeConverted);
		//console.log("First TIME: " + firstTimeConverted);
		
		// Current Time
		var currentTime = moment();
		//console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		//console.log("DIFFERENCE IN TIME: " + diffTime);


		// Time apart (remainder)
		var tRemainder = diffTime % tFrequency;
		//console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = tFrequency - tRemainder;
		//console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		//console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))


		tableData4.html(moment(nextTrain).format("hh:mm"));
		tableData5.html(tMinutesTillTrain);

		tableRow.append(tableData1);
		tableRow.append(tableData2);
		tableRow.append(tableData3);
		tableRow.append(tableData4);
		tableRow.append(tableData5);

		$("#trainTable > tbody").append(tableRow);
		});

})

