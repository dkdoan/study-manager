document.getElementById("start").addEventListener("click", startTimer)
document.getElementById("log").addEventListener("click", logSession)
document.getElementById("study").addEventListener("click", startStudy)
document.getElementById("break").addEventListener("click", startBreak)
document.getElementById("reset").addEventListener("click", reset)

let audioStart;
let audioStop;
let currMin = 24;
let currSecs = 60;
let logBoxOpen = false;
let startInterval;
let pauseInterval;
let startState;
let breakState;
let studyState = true;
let timeSpent;
let secondsElapsed = 0;

let logNotifCreated = false;

function decrementTimer()
{
    startState = true;
    if (currSecs == 0 && currMin == 0)
    {
        document.getElementById("minutes").innerHTML = "00"
        document.getElementById("seconds").innerHTML = "00"
        clearInterval(startInterval)
        var audio = new Audio(url)
        audio.volume = 0.25
        audio.play()
    }
    else if (currSecs == 0 && currMin != 0)
    {
        currMin -= 1;
        currSecs = 59;
        if (currMin < 10 && currMin > 0)
        {
            document.getElementById("seconds").innerHTML = currSecs;
        }
        else
        {
            document.getElementById("minutes").innerHTML = currMin;
            document.getElementById("seconds").innerHTML = currSecs;
        }
    }
    else
    {
        currSecs -= 1;
        if (currSecs == 0)
        {
            document.getElementById("minutes").innerHTML = currMin;
            document.getElementById("seconds").innerHTML = "00";
        }

        else if (currSecs < 10 && currSecs > 0)
        {
            document.getElementById("minutes").innerHTML = currMin;
            document.getElementById("seconds").innerHTML = `0${currSecs}`;
        }
        else
        {
            document.getElementById("minutes").innerHTML = currMin;
            document.getElementById("seconds").innerHTML = currSecs;
        }
    }

    if (studyState == true)
        secondsElapsed += 1;


}

function startTimer()
{
    if (startState == true)
    {
        pauseTimer();
    }

    else
    {
        startState = true;
        startInterval = setInterval(decrementTimer, 1000);
        document.getElementById("start").innerHTML = "pause"
    }
}

function pauseTimer()
{
    startState = false;
    document.getElementById("start").innerHTML = "start"
    pauseInterval = clearInterval(startInterval)
    
}

function startStudy()
{   
    studyState = true;
    breakState = false;
    document.getElementById("break").style.backgroundColor = 'rgb(128, 144, 217)';
    document.getElementById("study").style.backgroundColor = 'rgb(114, 66, 245)';
    pauseTimer()
    document.getElementById("minutes").innerHTML = "25";
    document.getElementById("seconds").innerHTML = "00";
    currMin = 24;
    currSecs = 60;
}

function startBreak()
{      
    
    breakState = true;
    studyState = false;

    document.getElementById("study").style.backgroundColor = 'rgb(128, 144, 217)';
    document.getElementById("break").style.backgroundColor = 'rgb(114, 66, 245)';
    document.getElementById("minutes").innerHTML = "5";
    document.getElementById("seconds").innerHTML = "00";
    currMin = 4;
    currSecs = 60;
    pauseTimer();
}

function reset()
{
    if (breakState == true)
    {
        document.getElementById("minutes").innerHTML = "5";
        document.getElementById("seconds").innerHTML = "00";
        currMin = 4;
        currSecs = 60;
        pauseTimer();
    }

    else if (studyState = true)
    {
        document.getElementById("minutes").innerHTML = "25";
        document.getElementById("seconds").innerHTML = "00";
        currMin = 24;
        currSecs = 60;
        pauseTimer();
    }
}

function logSession()
{   
    if (logBoxOpen == false)
    {
        logBoxOpen = true;
        var input = document.createElement('input'); 
        input.setAttribute("id", "log-text");

        //var logButton = document.getElementById("log")
        //logButton.style.backgroundColor = "lightgreen";
        //logButton.style.color = "green"
        input.type = "text";
        input.setAttribute("placeholder","  subject:")
        newControls = document.getElementById("controls");
        newControls.appendChild(input)
    }
    else
    {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", '/')
        httpRequest.setRequestHeader('X-CSRFToken', csrfToken);

        var sessionSubject = document.getElementById("log-text").value;
        
        jsonSession = {'subject': sessionSubject, 'timeSpent': getTimeSpent()}
        
        
        httpRequest.send(JSON.stringify(jsonSession))

        httpRequest.onload = function()
        {
            if (logNotifCreated == false)
            {
                logNotif = document.createElement('p')
                logNotif.innerHTML = `logged ${sessionSubject} for ${getTimeSpent()}`;
                logNotif.setAttribute('id', 'log-notif');
                newControls = document.getElementById("controls");
                newControls.appendChild(logNotif)
                logNotifCreated = true;
                secondsElapsed = 0;

                warning = document.createElement('p')
                warning.innerHTML = "note: sessions will not save if you are not logged in"
                warning.setAttribute('id','warning')
                newControls.appendChild(warning)

            }
            else
            {
                logNotif.innerHTML = `logged ${sessionSubject} for ${getTimeSpent()}`;
                secondsElapsed = 0;
            }
            
        }
        
    }
}


function getTimeSpent()
{
    timeSpent = (Math.floor(secondsElapsed / 60));
    return timeSpent.toString() + " minutes"
    
}