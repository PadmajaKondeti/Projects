
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
		var tFrequency = 3;
		var firstTime = "03:30"; // Time is 3:30 AM

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



// 1. Link to Firebase
var trainData = new Firebase("https://trainsched20160618.firebaseio.com/");
// 2. Button for adding Train info
$(document).ready(function(){
	$(document).on("click", "#submitInfo", function(){
		debugger
		// Grabs user input
		var trainName = $("#trainName").val().trim();
		var destination = $("#destination").val().trim();
		var firstTrain = moment($("#firstTrain").val().trim(), "DD/MM/YY").format("X");
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
		// Logs everything to console
		console.log(newTrainInfo.trainName);
		console.log(newTrainInfo.destination);
		console.log(newTrainInfo.frequency);
		console.log(newTrainInfo.firstTrain)
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

		console.log(childSnapshot.val());

		// Store everything into a variable.
		var trainName = childSnapshot.val().trainName;
		var destination = childSnapshot.val().destination;
		var firsttraintime = childSnapshot.val().firsttraintime;
		var frequency = childSnapshot.val().frequency;

		// Employee Info
		console.log(trainName);
		console.log(destination);
		console.log(firsttraintime);
		console.log(frequency);

		/*// Prettify the employee start
		var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
		// Calculate the months worked using hardconre math
		// To calculate the months worked
		var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
		console.log(empMonths);

		// Calculate the total billed rate
		var empBilled = empMonths * empRate;
		console.log(empBilled);

		// Add each train's data into the table
		$("#trainTable > tbody").append("<tr><td>" +
		 trainName + "</td><td>" + destination + "</td><td>" + frequency
		  + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td>";
*/
		var tableRow = $("<tr>");
		debugger
		var tableData1 = $("<td>");
		tableData1.html(trainName);
		debugger
		console.log( tableData1.html());
		var tableData2 = $("<td>");
		tableData2.html(destination);
		var tableData3 = $("<td>");
		tableData3.html(frequency);
		
		var tableData4 = $("<td>");
		tableData4.html(frequency);
		var tableData5 = $("<td>");
		tableData4.html(frequency);

		tableRow.append(tableData1);
		tableRow.append(tableData2);
		tableRow.append(tableData3);
		tableRow.append(tableData4);
		tableRow.append(tableData5);

		$("#trainTable > tbody").append(tableRow);
		});

})

