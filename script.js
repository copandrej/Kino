function zapri(el) {
    (el.clientHeight >= 45) ? el.style.height = "41px" : el.style.height = (el.childNodes[3].clientHeight + 41).toString() + "px";
}
function poravnaj(el) {
    if (el.clientHeight >= 45) el.style.height = (el.childNodes[3].clientHeight + 41).toString() + "px";
}


window.addEventListener("load", () => {
    let DneviSlo = ["TOREK", "SREDA", "ČETRTEK", "PETEK", "SOBOTA"];
    let DneviEng = ["TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    let userLang = navigator.language || navigator.userLanguage; 
    let trenutniJezik = ""

    if(userLang == "sl" && trenutniJezik != "sl") 
        spremembaJezika("sl");
    else if (userLang != "sl" && trenutniJezik != "en")
        spremembaJezika("en");

    $(".slo").click(() => {spremembaJezika("sl");});
    $(".eng").click(() => {spremembaJezika("en");});

    function spremembaJezika(Jezik) {
        let spremeni = document.getElementsByClassName("dan");
        let prevedi = document.getElementsByClassName("prevedi");
        if (Jezik == "sl") {
            trenutniJezik = "sl";     
            for (let i = 0; i < spremeni.length; i++)
                spremeni[i].innerText = DneviSlo[i];

            prevedi[0].innerText = "ZAVOD ASPEKT    PREDSTAVLJA";
            prevedi[1].innerText = "PIŠITE NAM";
            vsebina(trenutniJezik);
            
        } else {
            trenutniJezik = "en";
            for (let i = 0; i < spremeni.length; i++)
                spremeni[i].innerText = DneviEng[i];
            prevedi[0].innerText = "ASPEKT INSTITUTE    PRESENTS";
            prevedi[1].innerText = "EMAIL US";
            vsebina(trenutniJezik);
        }
    }

    function vsebina(jezik) {
        let imeDatoteke = `vsebina/${jezik}.json`
        console.log(imeDatoteke);
        $.getJSON(imeDatoteke, (data) => {
            let dnevi = document.getElementsByClassName("skri");
            for (let i = 0; i < dnevi.length; i++) {  
                let string = ""; 
                for (let k = 0; k < data[DneviEng[i]].length; k++) {
                    string +=  `<h3>${data[DneviEng[i]][k].naslov}</h3><p>`;
                    for (let j = 0; j < data[DneviEng[i]][k].vrstice.length; j++) {
                        string += `${data[DneviEng[i]][k].vrstice[j]}<br>`
                    }
                    string += "</p>"
                }
                dnevi[i].innerHTML = string;
                poravnaj(dnevi[i].parentNode);
            } 
      });
    }
});