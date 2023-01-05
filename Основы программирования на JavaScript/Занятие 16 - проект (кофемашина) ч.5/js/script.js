let money = document.getElementById("money");
let display = document.getElementById("display");
let bills = document.querySelectorAll('img[src$="rub.jpg"]');
let billAcc = document.getElementById("billAcc");
let info = document.getElementById("info");
let balance = document.getElementById("balance");
let changeBox = document.getElementById("changeBox");
let progressBar = document.querySelector(".progress-bar");
for (let i = 0; i < bills.length; i++) {
    let bill = bills[i];
    bill.onmousedown = function (event){
        bill.ondragstart = function (){return false;}
        bill.style.position = "absolute";
        bill.style.transform = "rotate(90deg)";
        bill.style.top = event.pageY - bill.getBoundingClientRect().width/2 + "px";
        bill.style.left = event.pageX - bill.getBoundingClientRect().height/2 + "px";
        window.onmousemove = function (e){
            bill.style.top = e.pageY - bill.getBoundingClientRect().width/2 + "px";
            bill.style.left = e.pageX - bill.getBoundingClientRect().height/2 + "px";
        }
        window.onmouseup = function (){
            window.onmousemove = function (){return false;}
            let billAccTop = billAcc.getBoundingClientRect().top;
            let billAccRight = billAcc.getBoundingClientRect().right;
            let billAccLeft = billAcc.getBoundingClientRect().left;
            let billAccBottom = billAcc.getBoundingClientRect().bottom-(2*(billAcc.getBoundingClientRect().height/3));
            let billTop = bill.getBoundingClientRect().top;
            let billRight = bill.getBoundingClientRect().right;
            let billLeft = bill.getBoundingClientRect().left;
            if(billAccTop<billTop && billAccRight>billRight && billAccLeft<billLeft && billAccBottom>billTop){
                bill.hidden = true;
                changeBalance(bill.dataset.nominal)
            }
        }
    }
}
function getCoffee(coffeeName, price){
    if(money.value>=price){
        changeBalance(-price);
        let i = 0;
        info.innerText = "<i class='fa-solid fa-hourglass-start'></i> Ожидайте...";
        progressBar.hidden = false;
        let timerId = setInterval(()=>{
            i++;
            progressBar.style.width = i+"%";
            if(i==40){
                info.innerText = "<i class='fa-solid fa-hourglass-half'></i> Ожидайте...";
            }else if(i==80){
                info.innerText = "<i class='fa-solid fa-hourglass-end'></i> Ожидайте...";
            }else if(i==120){
                info.innerText = `Кофе ${coffeeName} готов`;
                progressBar.hidden = true;
                progressBar.style.width = "0%";
                clearInterval(timerId);
            }
        }, 40);
    }else{
        info.innerText = "Недостаточно средств";
    }
}
function changeBalance(num){
    money.value = (+money.value)+(+num);
    balance.innerText = money.value;
}
function getChange(num){
    let coin = 0;
    //coin = (num>=10)?10:(num>=5)?5:(num>=2)?2:(num>=1)?1:0;
    let top = getRandom(0, 140);
    let left = getRandom(0, changeBox.getBoundingClientRect().width-60);
    if(num>=10) coin = 10;
    else if(num>=5) coin = 5;
    else if(num>=2) coin = 2;
    else if(num>=1) coin = 1;

    if(coin!=0){
        changeBox.innerHTML += `<img onclick="this.hidden = true" src="img/${coin}rub.png" style="top: ${top}px; left: ${left}px;">`;
        getChange(num-coin);
    }else{
        let audio = new Audio('audio/money.mp3');
        audio.play();
        changeBalance(-money.value);
    }
}

function getRandom(min, max){
    return Math.random()*(max-min)+min;
}
