scoreLeftWrist = 0;
song1Status = "";
var music1 = "";
var music2 = "";
var leftWristX = 0;
var leftWristY = 0;

function preload()
{
	song1 = loadSound("music.mp3");
	song2 = loadSound("music2.mp3");
}

function setup() {
	canvas = createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

	song1Status = music1.isPlaying();

	fill("FF0000");
    stroke("FF0000");
	
	if(scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
		music2.stop();

		if(song1Status == false) {
			song1.play();
			document.getElementById("song").innerHTML = "Song 1";
		}
	}

	song2Status = music2.isPlaying() 

	if(scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
		music2.stop();

		if(song2Status == false) {
			song2.play();
			document.getElementById("song").innerHTML = "Song 2";
		}
	}

}

function gotPoses() {
	console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
	scoreRightWrist = results[0].pose.keypoints[10].score;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

	rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
}

