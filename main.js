leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristy = 0;
scorerightwrist = 0;
scoreleftwristx = 0;

song = "";


function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');

    
   if(scoreleftwristx > 0.2){ // If component is in front of the webcam, it is greater that 0.2
     circle(leftWristX, leftWristY, 23);
     
    NumberleftWristY = Number(leftWristY); //Converting to a string to a number
    remove_decimals= floor(NumberleftWristY); // Rounding it off
    volume = remove_decimals/500;
    document.getElementById("vol").innerHTML = "Volume" + volume;
    song.setVolume(volume); // Sets volume
   }

   if(scorerightwrist > 0.2){
       circle(rightWristX, rightWristY, 20);

       if(rightWristY > 0 && rightWristY <=100){
           document.getElementById("speed").innerHTML = "Speed = 0.5x";
           song.rate(0.5);
       }
       else if(rightWristY > 100 && rightWristY <=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <=500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
   }

}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(0.4);
    song.rate(1);
}

function modelLoaded(){
    console.log("Model is loaded!");
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwristx = results[0].pose.keypoints[9].score;
        console.log("Left Wrist score:" +scoreleftwristx);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X coordinates:" + leftWristX, "Left wrist Y coordinates:" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X coordinates:" +rightWristX, "Right wrist Y coordinates:" + rightWristY);
        
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log(scorerightwrist);
    }
}

