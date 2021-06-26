let hidden = true;
let songData = [{"songName":"Lovely",
                 "imageCoverUrl":"./covers/lovely.png",
                 "artistName" : "Billie Eilish",
                 "audioUrl" : "./urls/Lovely.mp3"},
                 {"songName":"Believer",
                 "imageCoverUrl": "./covers/Believer.jpg",
                 "artistName" : "Imagine Dragons",
                 "audioUrl" : "./urls/Believer.mp3"},
                 {"songName":"Break My Heart",
                 "imageCoverUrl":"./covers/Break my heart.png",
                 "artistName" : "Dua Lipa",
                 "audioUrl" : "./urls/Break My Heart.mp3"},
                 {"songName":"Brown Munde",
                 "imageCoverUrl":"./covers/Brown Munde.jpg",
                 "artistName" : "Various artists",
                 "audioUrl" : "./urls/Brown Munde.mp3"},
                 {"songName":"Dusk Till Dawn",
                 "imageCoverUrl":"./covers/dusk till dawn.jpg",
                 "artistName" : "Zayn",
                 "audioUrl" : "./urls/Dusk Till Dawn.mp3"},
                 {"songName":"Dilbaro",
                 "imageCoverUrl":"./covers/dilbaro.jpg",
                 "artistName" : "Harshdeep Kaur, Vibha Sraf",
                 "audioUrl" : "./urls/Dilbaro.mp3"},
                 {"songName":"Dhadak",
                 "imageCoverUrl":"./covers/dhadak.jpg",
                 "artistName" : "Ajay Gogavale",
                 "audioUrl" : "./urls/Dhadak.mp3"},
                 {"songName":"Ice Cream",
                 "imageCoverUrl":"./covers/ice cream.png",
                 "artistName" : "Blackpink",
                 "audioUrl" : "./urls/Ice Cream.mp3"},
                 {"songName":"IDGAF",
                 "imageCoverUrl":"./covers/idgaf.jpg",
                 "artistName" : "Dua Lipa",
                 "audioUrl" : "./urls/IDGAF.mp3"},
                 {"songName":"Senorita",
                 "imageCoverUrl":"./covers/senorita.jpg",
                 "artistName" : "Shawn Mendes",
                 "audioUrl" : "./urls/senorita.mp3"},
                 {"songName":"Natural",
                 "imageCoverUrl":"./covers/natural.png",
                 "artistName" : "Imagine Dragon",
                 "audioUrl" : "./urls/Natural.mp3"},
                 {"songName":"Peaches",
                 "imageCoverUrl":"./covers/peaches.jpg",
                 "artistName" : "Justin Beiber",
                 "audioUrl" : "./urls/Peaches.mp3"},
                 {"songName":"Perfect",
                 "imageCoverUrl":"./covers/perfect.jpg",
                 "artistName" : "Ed Sheeran",
                 "audioUrl" : "./urls/Perfect.mp3"},
                 {"songName":"Makhna",
                 "imageCoverUrl":"./covers/makhna.jpg",
                 "artistName" : "Tanishk, Yasser, Asees",
                 "audioUrl" : "./urls/Makhna.mp3"},
                 {"songName":"Mann Bharya",
                 "imageCoverUrl":"./covers/mann bharya.jpg",
                 "artistName" : "B Praak",
                 "audioUrl" : "./urls/Mann Bharrya.mp3"},
                 {"songName":"Muqabla",
                 "imageCoverUrl":"./covers/muqabla.jpg",
                 "artistName" : "Yash Narvekar",
                 "audioUrl" : "./urls/Muqabla.mp3"}];
function loadCards(){
    for(let i in songData){
        $(".content-area").append(` <div class="music-card">
                                        <div class="content">
                                            <div class="img-box">
                                                <img src="${songData[i].imageCoverUrl}">
                                            </div>
                                            <div class="play-btn"><span class="material-icons">play_arrow</span></div>
                                            <div class="song-name">${songData[i].songName}</div>
                                            <div class="artist-name">${songData[i].artistName}</div>
                                            <div class="material-icons fav-select">favorite</div>
                                        </div>
                                    </div>`);
    }
    $(".music-card").mouseover(function(e){
        $($(this).children()[0]).children()[1].style.visibility="visible";
    });
    
    $(".music-card").mouseout(function(e){
        $($(this).children()[0]).children()[1].style.visibility="hidden";
    });

    $(".play-btn").click(function(e){
        // $('.play-song').each(function(){
        //     this.pause(); // Stop playing
        //     this.currentTime = 0; // Reset time
        //     $(this).removeClass("play-song");
        // }); 
        // $($($(this).parent()).children()[4]).addClass("play-song");
        let idx;
        for(let i in songData){
            if(songData[i].songName == $($(this).parent()).children()[2].innerText){
                idx = i;
                break;
            }
        }
        loadTrack(idx);
        playTrack();
    });
    $(".fav-select").click(function(e){
        if($(this).hasClass("favourites")){
            $(this).removeClass("favourites");
        }
        else{
            $(this).addClass("favourites");
        }
    });
}

loadCards();

let curr_song = document.createElement('audio');
let trackName = document.querySelector(".track-name");
let curr_time = document.querySelector(".curr_time");
let total_duration = document.querySelector(".total-duration");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let play_container = document.querySelector(".play-container");
let updateTimer;
let isPlaying = false;

$(".sticky-container")[0].style.visibility = "hidden";
$(".drop-down").click(function(e){
   if(hidden==true){
       console.log("hi");
        $(".sticky-container")[0].style.visibility = "visible";
        $(".collapse").text("expand_more");
        hidden = false;
   }
   else{
        console.log("bye");
        $(".sticky-container")[0].style.visibility = "hidden";
        $(".collapse").text("expand_less");
        hidden = true;
   }
});

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function loadTrack(trackIndex){
    resetValues();
    $(".sticky-container")[0].style.visibility = "visible";
    hidden = false;
    curr_song.src = songData[trackIndex].audioUrl;
    curr_song.load();
    trackName.innerText = songData[trackIndex].songName;
    console.log(curr_song.duration);
    updateTimer = setInterval(seekUpdate, 1000);
    // curr_song.addEventListener("ended", nextTrack);
}
function playpauseTrack() {
    if (!isPlaying) {
        playTrack();
    }
    else pauseTrack();
}

function playTrack() {
    curr_song.play();
    isPlaying = true;
    play_container.innerHTML = '<div class="toggle-play play material-icons">pause</div>';
    $(".toggle-play").click(function(){
        playpauseTrack();
    });
}

function pauseTrack() {
    curr_song.pause();
    isPlaying = false;
    play_container.innerHTML = '<div class="toggle-play play material-icons">play_arrow</div>';
    $(".toggle-play").click(function(){
        playpauseTrack();
    });
}  

function setVolume() {
    $(".volume_slider")[0].style.setProperty("--webkitProgressPercent" , `${volume_slider.value}%`);
    curr_song.volume = volume_slider.value / 100;
}

function seekTo() {
    seekto = curr_song.duration * (seek_slider.value / 100);
    curr_song.currentTime = seekto;
}

function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_song.duration)) {
      seekPosition = curr_song.currentTime * (100 / curr_song.duration);
      seek_slider.value = seekPosition;
      $(".seek_slider")[0].style.setProperty("--webkitProgressPercent" , `${seekPosition}%`);
      let currentMinutes = Math.floor(curr_song.currentTime / 60);
      let currentSeconds = Math.floor(curr_song.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_song.duration / 60);
      let durationSeconds = Math.floor(curr_song.duration - durationMinutes * 60);
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

$("#search").on("keyup", function() {
        let g = $(this).val().toLowerCase();
        if($(".home").hasClass("selected")){
            $(".music-card .content .song-name").each(function() {
                let s = $(this).text().toLowerCase();
                $(this).closest('.music-card')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
            });
        }
        else if($(".fav").hasClass("selected")){
            $(".music-card .content .favourites").each(function() {
                let s = $($(this).parent().children()[2]).text().toLowerCase();
                $(this).closest('.music-card')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
            });
        }
});

$(".option").click(function(){
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    if($(this).hasClass("fav")){
        let cnt = 0;
        $(".music-card .content .fav-select").each(function() {
            if($(this).hasClass("favourites") == false){
                $(this).closest('.music-card')['hide']();
            }
            else{
                cnt++;
            }
        });
        if(cnt==0){
            alert("You can add songs to favourites by clicking on the heart icon available for each song!");
            $(".home").click();
        }
    }
    else if($(this).hasClass("home")){
        $(".music-card").each(function() {
           $(this).show();
        });
    }
    else if($(this).hasClass("library")){
        let checkData = localStorage.getItem("allTasks");
        if(checkData==null){
            alert("You can create your own playlist using the create playlist button present on the bottom left corner");
            $(".home").click();
        }
        else{
            location.assign("library.html");
        }
    }
});

$("#search").on("focus",function(){
    //console.log("hi");
    $(".search-bar").addClass("pink-border");
});
$("#search").blur(function(){
    $(".search-bar").removeClass("pink-border");
});



$(".profile").click(function(){
    let imgsrc =  $(".profile_picture").attr("src");
    $(".container").append(`<div class="playlist-modal-parent">
                                <div class="add-playlist-modal">
                                    <div class="sheet-modal-title">Profile Picture</div>
                                    <div class="box">
                                        <div class="img-container">
                                            <div class="upload-img material-icons">edit</div>
                                            <img class="playlist-img" src = "${imgsrc}" />
                                        </div>
                                    </div>
                                    <div class="sheet-modal-confirmation">
                                        <div class="button yes-button">Save</div>
                                        <div class="button no-button">Discard</div>
                                    </div>
                                </div>
                            </div>`);
            // $("body").css("overflow-y","hidden");
            $(".no-button").click(function(e){
                $(".playlist-modal-parent").remove();
                $("body").css("overflow-y","scroll");
            });
        $(".upload-img").hide();
        $(".img-container").mouseover(function(){
                $('.upload-img').show();
        });
        $(".img-container").mouseout(function(){
            $('.upload-img').hide();
        });
        let url;
        url =  document.querySelector('.playlist-img').src;
        $(".upload-img").click(function(){
            let inputFile = $(`<input accept='image/*' type='file' />`);
            $(".container").append(inputFile);
            inputFile.click();
            inputFile.change(function(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onload = function(){
                    var dataURL = reader.result;
                    var output = document.querySelector('.playlist-img');
                    output.src = dataURL;
                     url = dataURL;
                  };
                  reader.readAsDataURL(file);
                  inputFile.remove();
            });
        });
        $(".yes-button").click(function(){
            $(".profile_picture").attr("src",url);
            $(".playlist-modal-parent").remove();
            $("body").css("overflow-y","scroll");
        });
    });

$(".create").click(function(){  
    $(".container").append(`<div class="playlist-modal-parent">
    <div class="add-playlist-modal2">
        <div class="sheet-modal-title">Create Your Music Playlist</div>
        <div class="sheet-modal-input-container">
            <span class="sheet-modal-input-title">Name</span>
            <input class = "sheet-modal-input" type="text" placeholder="Playlist"/>
        </div>
        <div class="sheet-modal-confirmation">
            <div class="button yes-button">Save</div>
            <div class="button no-button">Discard</div>
        </div>
    </div>
</div>`);
    // $("body").css("overflow-y","hidden");
    $(".no-button").click(function(e){
        $(".playlist-modal-parent").remove();
        $("body").css("overflow-y","scroll");
    });
    $(".yes-button").click(function(){
            let name = $(".sheet-modal-input").val();
            if(name == ""){
                alert("Playlist name cannot be empty!");
                return;
            }
            let allTaskData = localStorage.getItem("allTasks");
            if(allTaskData==null){
                console.log("hello");
                let data = [{"name":name, "songs":[]}];
                localStorage.setItem("allTasks",JSON.stringify(data));
            }
            else{
                let data = JSON.parse(allTaskData);
                data.push({"name":name, "songs":[]});
                localStorage.setItem("allTasks",JSON.stringify(data));
            }
            $(".library").click();
    });
});



