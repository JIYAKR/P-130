leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;
scoreLeftWrist=0;
scoreRightWrist=0;
song_var="";


function setup () {
    canvas=createCanvas(600, 500);
    canvas.position(400, 300);

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length>0) {
        scoreLeftWrist=results[0].pose.keypoints[10].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function modelLoaded() {
    console.log('PoseNet Is Installed')
}

function draw() {
    image(video, 0, 0, 600, 500)
    
    stroke("#FF0000");
    fill('#FF0000');
    circle(leftWristX, leftWristY,20);
    fill('#FF0000');
    circle(rightWristX, rightWristY,20);
}

song="";
song1="";

function preload() {
    song=loadSound("music.mp3");
    song1=loadSound("music1.mp3");
}
    function play() {
        
    

    if (scoreLeftWrist>scoreRightWrist) {
        song.play();
        song1.stop();
    }

    if (scoreRightWrist>scoreLeftWrist) {
        song1.play();
        song.stop();
    }
}