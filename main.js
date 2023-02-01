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

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,got_result);
}

function got_result(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion_result1").innerHTML = results[0].label;
        document.getElementById("emotion_result2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "peace"){
            document.getElementById("Hand_Result").innerHTML = "&#9996;";
        }
        if(results[0].label == "hand split"){
            document.getElementById("Hand_Result").innerHTML = "&#128406;";
        }
        if(results[0].label == "crazy"){
            document.getElementById("Hand_Result").innerHTML = "&#129304;";
        }

        if(results[0].label == "peace"){
            document.getElementById("Hand_Result1").innerHTML = "&#9996;";
        }
        if(results[0].label == "hand split"){
            document.getElementById("Hand_Result1").innerHTML = "&#128406;";
        }
        if(results[0].label == "crazy"){
            document.getElementById("emoji_result1").innerHTML = "&#129304;";
        }  

    }
    
}

