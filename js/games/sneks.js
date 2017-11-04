function launchSneks() {
    canv=document.getElementById("sneksCanvas");
    canv.style.display= "block";
    canv.width= "400";
    canv.height= "400";
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    canv.style.border = "0px solid black";
    gameIntro();
}

function closePopup() {
    popUp = false;
    tail = prevLength;
}

function gameIntro() {
    background();
    ctx.fillStyle = "black";
    ctx.font = "40px Comic Sans MS";
    ctx.fillText("Sneks",120,(canv.height/2)-20);
    setTimeout(function() {setInterval(snkgame,1000/10)}, 3000);
}

function background() {
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canv.width,canv.height);
    ctx.fillStyle="#FFF2D7";
    fillCircle(20,20,20);
    fillCircle(canv.width-20,20,20);
    fillCircle(canv.width-20,canv.height-20,20);
    fillCircle(20,canv.height-20,20);
    ctx.fillRect(20,0,canv.width-40,canv.height);
    ctx.fillRect(0,20,canv.width,canv.height-40);
}

px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;
framecnt = 0;
text = "Baby Snek";

popUp = false;
popUpText = "";

prevLength = 0;

hasSelfieStick = false;
hasTopHat = false;

function snkgame() {

    if (!popUp) {
        moveSnek();
    } else {
        displayPopUp();
    }

    if (tail == 7) {
        text = "Adolescent Snek";
    }

    if (tail == 13) {
        text = "Teenager Snek";
        if (!hasSelfieStick) {
            popupBox("Selfie stick unlocked!");
            hasSelfieStick = true;
        }
    }
}

function popupBox(text) {
    popUp = true;
    popUpText = text;
    prevLength = tail;
    moveSnek();
}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            if (xv!=-1&&yv!=0) {
                xv=-1;yv=0;
            }
            break;
        case 38:
            if (xv!=0&&yv!=-1) {
                xv=0;yv=-1;
            }
            break;
        case 39:
            if (xv!=-1&&yv!=0) {
                xv=1;yv=0;
            }
            break;
        case 40:
            if (xv!=0&&yv!=1) {
                xv=0;yv=1;
            }
            break;
        case 27:
            if (confirm("Are you sure you want to leave game? Progress may be lost.")) {
                window.close();
                break;
            } else {
                break;
            }
            break;
            
    }
}

function moveSnek() {
    background();

    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }

    ctx.fillStyle = "black";
    ctx.font = "20px Comic Sans MS";
    ctx.fillText(text,20,canv.height - 20);

    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs,gs);

    ctx.fillStyle="orange";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs,gs);
        if(trail[i].x==px && trail[i].y==py) {
            tail = 5;
            text = "Baby Snek";
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
        trail.shift();
    }
 
    if(ax==px && ay==py) {
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }

    if (framecnt<100){
        framecnt++;
    }
    if (framecnt==2) {
        xv=1;
    }
}

function fillCircle(x,y,size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    ctx.fill();
}

function displayPopUp() {
    ctx.fillStyle = "black";
    ctx.fillRect((canv.width/10)-1,(canv.height/4)-1,((canv.width/10)*8)+2,(canv.height/2)+2);
    ctx.fillStyle = "white";
    ctx.fillRect(canv.width/10,canv.height/4,(canv.width/10)*8,canv.height/2);
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText("X",canv.width-(canv.width/10)-15,(canv.height/4)+17);
    ctx.fillStyle = "black";
    ctx.font = "20px Comic Sans MS";
    ctx.fillText(popUpText,(canv.width/10)+10,(canv.height/2)-10);
}