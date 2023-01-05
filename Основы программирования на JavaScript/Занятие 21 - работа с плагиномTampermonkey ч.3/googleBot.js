// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

let btnK = document.getElementsByName("btnK")[1];
if(btnK != undefined){ // На главной странице поисковика google
    let words = ['Гобой', 'Флейта', 'Саксофон', 'Фагот', 'Кларнет'];
    let wordRandomIndex = getIntRandom(0, words.length);
    let word = words[wordRandomIndex];
    let i = 0
    let searchInput = document.getElementsByName("q")[0];
    let timerId = setInterval(()=>{
        searchInput.value += word[i++];
        if(i==word.length){
            clearInterval(timerId);
            setTimeout(()=>{btnK.click();},2000);
        }
    }, 500)

}else if(location.hostname == "www.google.com"){ // На странице поисковой выдачи
    let links = document.links;
    let goToTheNextPage = true;
    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            goToTheNextPage = false;
            setTimeout(()=>{link.click();},2000)
            break;
        }
    }
    if(+document.querySelector('.YyVfkd').innerText == 10 && goToTheNextPage) location.href = "https://www.google.com/";
    if(goToTheNextPage)
        setTimeout(()=>{document.getElementById('pnnext').click();}, 3000);
}else{
    let links = document.links;
    setInterval(()=>{
        if(getIntRandom(0,100) > 80) location.href = "https://www.google.com/";
        else{
            let linkIndex = getIntRandom(0, links.length);
            let link = links[linkIndex];
            if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1)
                links[linkIndex].click();
        }
    }, 3000)
}

function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
