var prediction_1 = "";
var prediction_2 = "";

Webcam.set(
    {
        width:350,
        height:300,
        image_format:"png",
        png_quality:90
    }
);
camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("output").innerHTML = "<img id='captured_image' src ='"+ data_uri+"'>";
    });
}

console.log("ml5.version",ml5.version);

classifier = ml5.classifyImage("https://teachablemachine.withgoogle.com/models/UVZsgEYNw/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded !!!");
}

function speak(){
    var synth = window.speechSynthesis;
    speech_data_1 = "the first prediction is "+ prediction_1;
    speech_data_2 = " and the second prediction is "+ prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speech_data_1 + speech_data_2);
    synth.speak(utterThis);
}
