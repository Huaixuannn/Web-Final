let mapArray, ctx, currentImagMain;
let imgMountian, imgMain, imgEnemy,imgFinal;
const gridLength = 75;


function loadImages(sources, callback){
    var images = {}
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources){
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

//initial
$(function(){
    // 0 : available, 1 : box, 2 : breakfast, 3 : lunch, 4 : dinner 
    mapArray = [
        [ 0, 1, 2, 0, 1, 0, 1],
        [ 0, 0, 1, 0, 0, 0, 0],
        [ 1, 0, 0, 0, 1, 1, 0],
        [ 0, 0, 0, 0, 1, 3, 0],
        [ 1, 1, 1, 0, 0, 1, 0],
        [ 1, 0, 0, 0, 0, 1, 1],
        [ 4, 0, 1, 0, 1, 0, 4]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "img/sprite-sheet.png";
    currentImagMain = {
        x:0,
        y:0
    };
    

    imgMain.onload = function(){
        //drawImage(image, sx, sy(裁切圖片的起點), sWidth, sHeight(裁切的寬高), dx, dy(繪製的起點), dWidth, dHeight(繪製的寬高))
        ctx.drawImage(imgMain,55,120,60,60,currentImagMain.x,currentImagMain.y, gridLength,gridLength)
        //ctx.drawImage(imgMain,250,0,80,130,200,200,gridLength,gridLength)
    };

    let sources = {
        box:"img/material.png",
        break:"img/foods.png",
        lunch:"img/foods.png",
        dinner:"img/foods.png"
    };

    
//     // 放障礙物
//     imgMountian = new Image();
//     imgMountian.src = "images/material.png";
//     imgEnemy = new Image();
//     imgEnemy.src = "images/Enemy.png";

    loadImages(sources, function(images){
        for(let x in mapArray){
            for(let y in mapArray){
                if(mapArray[x][y] == 1 ){
                    ctx.drawImage(images.box, 320,192,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                }    
                else if(mapArray[x][y] == 2){
                    ctx.drawImage(images.break, 144,216,72,72,y*gridLength,x*gridLength,gridLength,gridLength);
                }
                else if(mapArray[x][y] == 3){
                    ctx.drawImage(images.lunch, 648,216,72,72,y*gridLength,x*gridLength,gridLength,gridLength);
                }
                else if(mapArray[x][y] == 4){
                    ctx.drawImage(images.dinner, 504,288,72,72,y*gridLength,x*gridLength,gridLength,gridLength);
                }
            }
        }
    });

//     imgMountian.onload = function(){
//         imgEnemy.onload = function(){
//             for(let x in mapArray){
//                 for(let y in mapArray){
//                     if(mapArray[x][y] == 1){
//                         ctx.drawImage(imgMountian, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
//                     }
//                     else if(mapArray[x][y] == 3){
//                         ctx.drawImage(imgEnemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
//                     }
//                 }
//             }
//         }
//     }


// });

        
});

//Click Event
$(document).on("keydown", function(event){
    //console.log(event.key);
    let targetImg, targetBlock,cutImagePositionY;
    // cutImagePositionX - 決定主角臉朝向哪個方向
    targetImg = { // 主角的目標座標
        "x":-1,
        "y":-1
    };
    targetBlock = { // 主角的目標(對應2維陣列)
        "x":-1,
        "y":-1
    };
    event.preventDefault(); //按上下鍵 網頁不會上下捲動 避免鍵盤預設行為發生，如捲動/放大/換頁...

    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImagMain.x - gridLength;
            targetImg.y = currentImagMain.y;
            cutImagePositionY = 60; // face left
            break;
        case "ArrowUp":
            targetImg.x = currentImagMain.x;
            targetImg.y = currentImagMain.y - gridLength;
            cutImagePositionY = -5; // face up
            break;
        case "ArrowRight":
            targetImg.x = currentImagMain.x + gridLength;
            targetImg.y = currentImagMain.y;
            cutImagePositionY = 180; // face right
            break;
        case "ArrowDown":
            targetImg.x = currentImagMain.x;
            targetImg.y = currentImagMain.y + gridLength;
            cutImagePositionY = 120; // face down
            break;
        default: // 其他按鍵不處理
            return;
    };
     // 確認目標不超過地圖
    if(targetImg.x<525 && targetImg.x>=0 && targetImg.y<525 && targetImg.y>=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    //console.log();
    // 清空主角原本在的位置
    ctx.clearRect(currentImagMain.x, currentImagMain.y, gridLength, gridLength);

    let randomMeal;
    let randomIndex;
    const randomMealElement = document.getElementById("randomMeal");
    const randomCookingTimeElement = document.getElementById("randomCookingTime");
    const recipeImage = document.getElementById("recipeImage");
    const todoList = document.getElementById("todoList");
    const stepList = document.getElementById("step");

    if (targetBlock.x !=-1 && targetBlock.y !=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: // 可行走的路
                $("#talkBox").text("");
                currentImagMain.x = targetImg.x;
                currentImagMain.y = targetImg.y;
                break;
            case 1: // 障礙物
                $("#talkBox").text("⛰️⛰️⛰️有山⛰️⛰️⛰️");
                break;
            case 2: // breakfast
                ctx.clearRect(targetImg.x, targetImg.y, gridLength, gridLength);
                currentImagMain.x = targetImg.x;
                currentImagMain.y = targetImg.y;
                mapArray[targetBlock.x][targetBlock.y] = 0;
                $("#talkBox").text("Get a Breakfast Recipe!⬇️");
                randomIndex = Math.floor(Math.random() * breakfast.length);
                randomMeal = breakfast[randomIndex];
                randomMealElement.textContent = "Random breakfast : " + randomMeal.name;
                recipeImage.src = randomMeal.img;
                randomCookingTimeElement.textContent = "Cooking Time: " + randomMeal.cookTime;
                stepList.style.opacity = 1;
                todoList.style.opacity = 1;
                recipeImage.style.opacity = 1;
                // Clear existing todo list items
                todoList.innerHTML = "";
                // Clear existing todo list items
                todoList.innerHTML = "";

                // Display the ingredients list as checkable options
                if (randomMeal.ingredients) {
                todoList.textContent = "Ingredients List :" 
                randomMeal.ingredients.forEach(function(ingredient) {
                    const listItem = document.createElement("span");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = ingredient;
                    todoList.appendChild(document.createElement("br"));
                    listItem.appendChild(checkbox);
                    listItem.appendChild(document.createTextNode(ingredient));
                    todoList.appendChild(listItem);
                });
                }

                stepList.innerHTML = "";
                if (randomMeal.steps) {
                stepList.textContent = "Cooking Steps :" 
                randomMeal.steps.forEach(function(step) {
                    const listItem = document.createElement("li");
                    listItem.appendChild(document.createTextNode(step));
                    stepList.appendChild(listItem);
                });
                }
                break;
            case 3: // lunch
                ctx.clearRect(targetImg.x, targetImg.y, gridLength, gridLength);
                currentImagMain.x = targetImg.x;
                currentImagMain.y = targetImg.y;
                mapArray[targetBlock.x][targetBlock.y] = 0;
                $("#talkBox").text("Get a Lunch Recipe!⬇️");
                randomIndex = Math.floor(Math.random() * lunch.length);
                randomMeal = lunch[randomIndex];
                randomMealElement.textContent = "Random Lunch : " + randomMeal.name;
                recipeImage.src = randomMeal.img;
                randomCookingTimeElement.textContent = "Cooking Time: " + randomMeal.cookTime;
                stepList.style.opacity = 1;
                todoList.style.opacity = 1;
                recipeImage.style.opacity = 1;
                // Clear existing todo list items
                todoList.innerHTML = "";
                // Clear existing todo list items
                todoList.innerHTML = "";

                // Display the ingredients list as checkable options
                if (randomMeal.ingredients) {
                todoList.textContent = "Ingredients List :" 
                randomMeal.ingredients.forEach(function(ingredient) {
                    const listItem = document.createElement("span");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = ingredient;
                    todoList.appendChild(document.createElement("br"));
                    listItem.appendChild(checkbox);
                    listItem.appendChild(document.createTextNode(ingredient));
                    todoList.appendChild(listItem);
                });
                }

                stepList.innerHTML = "";
                if (randomMeal.steps) {
                stepList.textContent = "Cooking Steps :" 
                randomMeal.steps.forEach(function(step) {
                    const listItem = document.createElement("li");
                    listItem.appendChild(document.createTextNode(step));
                    stepList.appendChild(listItem);
                });
                }
                break;
            case 4: // dinner
                ctx.clearRect(targetImg.x, targetImg.y, gridLength, gridLength);
                currentImagMain.x = targetImg.x;
                currentImagMain.y = targetImg.y;
                mapArray[targetBlock.x][targetBlock.y] = 0;
                $("#talkBox").text("Get a Dinner Recipe!⬇️");
                randomIndex = Math.floor(Math.random() * dinner.length);
                randomMeal = dinner[randomIndex];
                randomMealElement.textContent = "Random Dinner : " + randomMeal.name;
                recipeImage.src = randomMeal.img;
                randomCookingTimeElement.textContent = "Cooking Time: " + randomMeal.cookTime;
                stepList.style.opacity = 1;
                todoList.style.opacity = 1;
                recipeImage.style.opacity = 1;
                // Clear existing todo list items
                todoList.innerHTML = "";
                // Clear existing todo list items
                todoList.innerHTML = "";

                // Display the ingredients list as checkable options
                if (randomMeal.ingredients) {
                todoList.textContent = "Ingredients List :" 
                randomMeal.ingredients.forEach(function(ingredient) {
                    const listItem = document.createElement("span");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = ingredient;
                    todoList.appendChild(document.createElement("br"));
                    listItem.appendChild(checkbox);
                    listItem.appendChild(document.createTextNode(ingredient));
                    todoList.appendChild(listItem);
                });
                }

                stepList.innerHTML = "";
                if (randomMeal.steps) {
                stepList.textContent = "Cooking Steps :" 
                randomMeal.steps.forEach(function(step) {
                    const listItem = document.createElement("li");
                    listItem.appendChild(document.createTextNode(step));
                    stepList.appendChild(listItem);
                });
                }
                break;
                }
                }
                else{
                    $("#talkBox").text("沒有路了❎❎❎");
                }

    // 重畫主角
    ctx.drawImage(imgMain,55,cutImagePositionY,60,60,currentImagMain.x,currentImagMain.y, gridLength,gridLength)

});


// Generate a random meal and cooking time
const breakfast = [
    { name: "蛋沙拉吐司", cookTime: "5 minutes", img:"img/b2.jpg",
      ingredients: [
        "1.水煮蛋2顆", 
        "2.沙拉醬適量", 
        "3.番茄醬適量",
        "4.吐司6片",
        "5.胡椒適量",
      ]
      ,steps: [
      "Step 1: 將水煮蛋用刀子切碎。",
      "Step 2: 將切細的水煮蛋倒入碗中，加入適量的沙拉醬與胡椒，混合均勻備用。",
      "Step 3: 取一片吐司，加入適量的蛋沙拉餡料，再蓋上另一片吐司備用",
      "Step 4: 取一個杯子或碗，從兩片夾心吐司上方，向下重壓並旋轉",
      "step 5: 當吐司附著於碗內或杯中時，用刀子輕畫周圍，將吐司取出即可。"
    ] },
    { name: "鬆餅", cookTime: "30 minutes", img:"img/b3.jpg",
      ingredients: [
        "1.鬆餅粉1包", 
        "2.雞蛋兩顆", 
        "3.牛奶/水 350ml",
        "4.奶油適量",
      ]
      ,steps: [
      "Step 1: 將鬆餅粉與雞蛋、牛奶用湯匙均勻攪拌。鑄鐵鍋加熱約5分鐘。",
      "Step 2: 鍋上均勻抹上一點點奶油。倒入三湯匙麵糊，等表面出現大量泡泡，翻面",
      "Step 3: 第二片：同樣倒入三湯匙，不用再加奶油。",
      "Step 4: 會有一個顏色均勻的面，完整呈現！"
    ] },
    { name: "月見吐司", cookTime: "15 minutes", img:"img/b5.jpg",
      ingredients: [
        "1.厚片吐司1片", 
        "2.雞蛋1顆", 
        "3.海鹽.黑胡椒適量",
        "4.起司絲適量",
      ]
      ,steps: [
      "Step 1: 烤箱預熱至170度。吐司以模具將中間挖空備用。",
      "Step 2: 吐司下墊一張烘焙紙，打入雞蛋，表面撒上起司絲。",
      "Step 3: 送入烤箱烤約10分鐘至蛋呈半熟，取出撒些海鹽及黑胡椒即可。"
    ] }
  ];
  
  const lunch = [
    { name: "韓式拌飯", cookTime: "20 minutes" ,img:"img/l1.jpg",
      ingredients: [
        "1.飯1碗", 
        "2.玉米粒1大匙", 
        "3.青江菜1小把",
        "4.金針菇.紅蘿蔔.櫛瓜.洋蔥各1/3",
        "5.蛋1顆",
        "6.白芝麻適量",
        "7.泡菜200克",
        "8.韓國芝麻油.橄欖油各1大匙"]
      ,steps: [
      "Step 1: 將食材洗淨切適口大小備用",
      "Step 2: 起鍋開中火加入橄欖油、飯及所有配料拌炒1分鐘",
      "Step 3: 加入蛋繼續拌炒至食材全部熟透",
      "Step 4: 淋上泡菜汁、韓國芝麻油、拌炒均勻收汁",
      "step 5: 最後灑上海苔酥、白芝麻即可"
    ]},
    { name: "輕食早午餐", cookTime: "20 minutes", img:"img/l2.png",
      ingredients: [
        "1.蛋1顆", 
        "2.法國麵包*2",
        "3.冷燻鮭魚適量",
        "4.生菜適量",
        "5.馬鈴薯適量"
      ]
      ,steps: [
      "Step 1: 生菜洗淨備用，法國麵包入烤箱烤熱。",
      "Step 2: 雞蛋與鮮奶混合，少許鹽巴黑胡椒",
      "Step 3: 入鍋弄成炒蛋備用。",
      "Step 4: 馬鈴薯水煮10分鐘，切塊與奶油香煎一下灑上義式香料即可備用",
      "step 5: 盤上放上生菜沙拉淋上喜歡的醬料，擺上冷燻鮭及炒蛋、香煎馬鈴薯"
    ] },
    { name: "Costco雞肉三明治", cookTime: "10 minutes", img:"img/l3.png",
      ingredients: [
        "1.Costco烤雞適量", 
        "2.生菜2片",
        "3.高麗菜絲適量",
        "4.黃芥苿少許",
        "5.土司2片",
        "6.大蕃茄1粒"<
        "7.日式美奶滋.塔塔醬適量"
      ]
      ,steps: [
      "Step 1: Costco烤雞雞胸的部份用手撕成一大片一大片，生菜切絲、大蕃茄切片。",
      "Step 2: 調醬，日式美奶滋加黃芥苿，均勻拌勻後抹在烤好的土司上。",
      "Step 3: 依序放上土司、高麗菜絲、蕃茄片、塔塔醬、雞肉絲、生菜、土司。",
      "Step 4: 切成兩半，完成。"
    ]  }
  ];
  
  const dinner = [
    { name: "火鍋湯烏龍麵", cookTime: "30 minutes" , img:"img/d1.jpg", 
      ingredients: [
        "1.烏龍麵1包", 
        "2.火鍋牛肉片1盒", 
        "3.紅蘿蔔片15片",
        "4.萵苣葉1棵",
        "5.木耳2朵",
        "6.火鍋湯底1包",
        "7.胡椒粉少許"]
      ,steps: [
      "Step 1: 紅蘿蔔洗乾淨切薄片，在切對半小薄片",
      "Step 2: 木耳，洗乾淨，切絲",
      "Step 3: 萵苣葉洗乾淨，切3等份,準備烏龍麵，火鍋湯底，火鍋牛肉片",
      "Step 4: 準備湯鍋，倒入火鍋湯底，放在瓦斯爐上加熱",
      "step 5: 加入切好的紅蘿蔔片、木耳絲、萵苣葉，待食材半熟",
      "Step 6: 放入火鍋牛肉片、烏龍麵，全部食材煮熟，瓦斯關火"
    ]},
    { name: "味噌奶油海鮮鍋", cookTime: "15 minutes", img:"img/d2.jpg",
      ingredients: [
        "1.蟳肉棒及火鍋料等適量",
        "2.蔬菜(菇類、玉米、大白菜等)適量",
        "3.味噌及奶油各1大匙",
        "4.高湯450cc"
      ]
      ,steps: [
      "Step 1: 先將高湯倒入鑄鐵鍋中並放入大白菜",
      "Step 2: 將蔬菜、菇類、海鮮火鍋料及奶油放入鍋中",
      "Step 3: 蓋上鍋子後煮至食材熟",
      "Step 4: 味噌放入濾網中攪拌至融化，略煮至滾即可享用",
      "Step 5: 香噴噴的「味噌奶油海鮮鍋」暖心上桌！"
  ] },
    { name: "電鍋清蒸魚", cookTime: "20 minutes", img:"img/d3.jpg",
      ingredients: [
        "1.紅哥里1條",
        "2.薑及醃菜各1小塊",
        "3.香油1小匙",
        "4.大蔥及大辣椒各1根",
        "5.蒸魚醬2大匙",
        "6.蒜頭2大瓣",
        "7.烹飪油1大匙"
      ]
      ,steps: [
      "Step 1: 魚洗淨後，魚身二面畫2刀，二面淋上米酒靜置一下",
      "Step 2: 將薑切片和切絲、蒜頭拍碎、大蔥切段後剖半和切絲",
      "Step 3: 將薑片鋪幾片在盤上，再放上魚",
      "Step 4: 將薑絲、蒜頭、大辣椒、大蔥塞在魚肚、腮內及鋪在魚上",
      "Step 5: 電鍋外鍋放人1杯水,蓋上鍋蓋，按下開關，等到電鍋開始冒煙",
      "step 6: 再放入魚，約蒸10分鐘",
      "step 7: 時間到後，拿出魚，將裡面魚汁倒掉、表面的大蔥片不要",
      "step 8: 重新鋪上大蔥絲，淋上蒸魚醬油",
      "step 9: 將烹飪油加入一點香油燒熱冒煙後，直接淋上，即完成"
  ] },
  ];