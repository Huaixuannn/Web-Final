let player; //YouTube Player
let currentPlay = 0; //記錄目前撥到第幾首歌

//YouTube API Ready
function onYouTubeIframeAPIReady(){
    console.log("YT Ready!")
    player = new YT.Player("b1-player",{
        height:"250",
        width:"350",
        videoId:bplayList[0],
        playerVars:{
            autoplay:0, //是否自動撥放
            controls:1, //是否顯示控制項
            start:bplayTime[0][0],//開始秒數
            end:bplayTime[0][1],//結束秒數
            iv_load_policy:3
        },
        events:{
            onReady:onPlayerReady,
            // onStateChange:onPlayerStateChange
        }
    });
    player = new YT.Player("b2-player",{
      height:"250",
      width:"350",
      videoId:bplayList[1],
      playerVars:{
          autoplay:0, //是否自動撥放
          controls:1, //是否顯示控制項
          start:bplayTime[1][0],//開始秒數
          end:bplayTime[1][1],//結束秒數
          iv_load_policy:3
      },
      events:{
          onReady:onPlayerReady,
      }
  });
  player = new YT.Player("b3-player",{
    height:"250",
    width:"350",
    videoId:bplayList[2],
    playerVars:{
        autoplay:0, //是否自動撥放
        controls:1, //是否顯示控制項
        start:bplayTime[2][0],//開始秒數
        end:bplayTime[2][1],//結束秒數
        iv_load_policy:3
    },
    events:{
        onReady:onPlayerReady,
    }
  });
  player = new YT.Player("l1-player",{
    height:"250",
    width:"350",
    videoId:lplayList[0],
    playerVars:{
        autoplay:0, //是否自動撥放
        controls:1, //是否顯示控制項
        start:lplayTime[0][0],//開始秒數
        end:lplayTime[0][1],//結束秒數
        iv_load_policy:3
    },
    events:{
        onReady:onPlayerReady,
    }
  });
  player = new YT.Player("l2-player",{
    height:"250",
    width:"350",
    videoId:lplayList[1],
    playerVars:{
        autoplay:0, //是否自動撥放
        controls:1, //是否顯示控制項
        start:lplayTime[1][0],//開始秒數
        end:lplayTime[1][1],//結束秒數
        iv_load_policy:3
    },
    events:{
        onReady:onPlayerReady,
    }
  });
  player = new YT.Player("l3-player",{
    height:"250",
    width:"350",
    videoId:lplayList[2],
    playerVars:{
        autoplay:0, //是否自動撥放
        controls:1, //是否顯示控制項
        start:lplayTime[2][0],//開始秒數
        end:lplayTime[2][1],//結束秒數
        iv_load_policy:3
    },
    events:{
        onReady:onPlayerReady,
    }
  });
  player = new YT.Player("d1-player",{
    height:"250",
    width:"350",
    videoId:dplayList[0],
    playerVars:{
        autoplay:0, //是否自動撥放
        controls:1, //是否顯示控制項
        start:dplayTime[0][0],//開始秒數
        end:dplayTime[0][1],//結束秒數
        iv_load_policy:3
    },
    events:{
        onReady:onPlayerReady,
    }
  });
  player = new YT.Player("d2-player",{
    height:"250",
    width:"350",
    videoId:dplayList[1],
    playerVars:{
        autoplay:0, //是否自動撥放
        controls:1, //是否顯示控制項
        start:dplayTime[1][0],//開始秒數
        end:dplayTime[1][1],//結束秒數
        iv_load_policy:3
    },
    events:{
        onReady:onPlayerReady,
    }
  });
  player = new YT.Player("d3-player",{
    height:"250",
    width:"350",
    videoId:dplayList[2],
    playerVars:{
        autoplay:0, //是否自動撥放
        controls:1, //是否顯示控制項
        start:dplayTime[2][0],//開始秒數
        end:dplayTime[2][1],//結束秒數
        iv_load_policy:3
    },
    events:{
        onReady:onPlayerReady,
    }
  });
}

//YouTube Player Ready
function onPlayerReady(event){
    $("#playButton").on("click",function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}
    

// function onPlayerStateChange(event){
//     console.log("[getCurrentTime]", )
//     if(Math.floor(player.getCurrentTime())==bplayTime[currentPlay][1]){
//         console.log("end");
//         if(currentPlay<bplayList.length-1){
//             currentPlay++;
//             player.loadVideoById({
//                 videoId:bplayList[currentPlay],
//                 startSeconds:bplayTime[currentPlay][0],
//                 endSeconds:bplayTime[currentPlay][1],
//                 suggestedQuality:"large"
//         });
//         }else{
//             currentPlay = 0;
//             player.cueVideoById({
//                 videoId:bplayList[currentPlay],
//                 startSeconds:bplayTime[currentPlay][0],
//                 endSeconds:bplayTime[currentPlay][1],
//                 suggestedQuality:"large"
//             });
//         } 
//     }
//     if(event.data==1){
//         $("h2").text(player.getVideoData().title);
//     }
// }
    

    