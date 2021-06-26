function loadPlaylist(){
    let allTaskData = localStorage.getItem("allTasks");
        let data = JSON.parse(allTaskData);
        if(data.length==0){
            alert("You can create your playlists and add them to library");
        }
        for(let i in data){
            $(".library-area").append(`<button class="accordion" val="${data[i].name}">${data[i].name}
            <div class="material-icons download-music" index="${i}">download</div>
            <div class="material-icons add-music" index="${i}">headphones</div>
            <div class="material-icons delete-playlist">delete</div>
            </button>
            <div class="panel-${i} acc-panel">
            </div>`)
        }
        for(let idx in data){
            for(let song of data[idx].songs){
                $(".panel-" + idx).append(`<div class="songs">${song}</div>`);
            }
        }
        var acc = document.getElementsByClassName("accordion");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });
        }
        $(".add-music").click(function(){
            $(".container").append(`<div class="playlist-modal-parent">
            <div class="music-modal">
                <div class="sheet-modal-title">Add Some Songs!
                <div class="material-icons cross">close</div>
                </div>
                <div class="modal-body"></div>
            </div>
            </div>`);
            $(".cross").click(function(){
                $(".playlist-modal-parent").remove();
            });
            for(let i in songData){
                let curr_song = songData[i].songName;
                let modalSong = `<div class="song-container">
                    <div class="modal-song">${curr_song}</div>
                    <div class="add-btn">Add</div>
                </div>`
                $(".modal-body").append(modalSong);
            }
            let idx = $(this).attr("index");
            let data = JSON.parse(localStorage.getItem("allTasks"));
            $(".add-btn").click(function(){
                if($(this).hasClass("added")){
                    $(this).removeClass("added");
                    $(this).text("Add");
                    let narr = data[idx].songs.filter((e)=>{
                        console.log(e);
                        return (e.toString() != $($($(this).parent()).children()[0]).text().toString());
                    });
                    console.log(narr);
                    data[idx].songs = [...narr];
                    localStorage.setItem("allTasks",JSON.stringify(data));
                }
                else{
                    $(this).addClass("added");
                    $(this).text("Remove");
                    data[idx].songs.push($($(this).parent()).children()[0].innerText);
                    localStorage.setItem("allTasks",JSON.stringify(data));
                }
                let data2 = JSON.parse(localStorage.getItem("allTasks"));
                $(".panel-"+idx).html(``);
                for(let song of data2[idx].songs){
                    // console.log(song);
                    $(".panel-" + idx).append(`<div class="songs">${song}</div>`);
                }
                addClickEvent();
            });    
            for(let j of data[idx].songs){
                $(".song-container").each(function(){
                    if($(this).children()[0].innerText==j){
                        $($(this).children()[1]).addClass("added");
                        $($(this).children()[1]).text("Remove");
                    }
                });
            }     
        });
        function addClickEvent(){
            $(".songs").click(function(){
                for(let i in songData){
                    if(songData[i].songName == $(this).text()){
                        loadTrack(i);
                        playTrack();
                    }
                }
            });
        }
        addClickEvent();

        $(".delete-playlist").click(function(){
           let playlistName =  $(this).parent().attr("val");
           console.log(playlistName);
           let data = JSON.parse(localStorage.getItem("allTasks"));
           let narr = data.filter(function(e){
                return (e.name !== playlistName);
            });
            data = [...narr];
           localStorage.setItem("allTasks",JSON.stringify(data));
           $(this).parent().next().remove();
           $(this).parent().remove();
        });
        function download(){
            const btns = document.querySelectorAll('.download-music');
            for(let btn of btns){
                btn.addEventListener('click',function(){
                    let title = btn.parentNode.getAttribute("val");
                    let a = document.createElement("a");
                    let idx = btn.getAttribute("index");
                    let d = JSON.parse(localStorage.getItem("allTasks"));
                    let variable = d[idx];
                    a.href = `data:application/json,${(JSON.stringify(variable))}`;
                    a.download = `${title}` + ".json";
                    $(".container").append(a);
                    a.click();
                    a.remove();
                });
            }
        }
        download();
}

loadPlaylist();

$(".fav").click(function(){
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
            location.assign("index.html");
        }
    });
    
$(".home").click(function(){
    location.assign("index.html");
});

const shareData = {
    title: 'Melody',
    text: 'Checkout Melody Music Player Web Application! ',
    url: 'http://127.0.0.1:5500/index.html',
  }
  
  const btn = document.querySelector('.share');  
  btn.addEventListener('click', async () => {
    try {
      await navigator.share(shareData)
    } catch(err) {
      alert("error");
    }
});