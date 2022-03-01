const LOW_TAX_RATE = 0.01;
const MID_TAX_RATE = 0.02;
const HIGH_TAX_RATE = 0.03;
var totalPrice = '';
var propPrice = '';
var downPay = '';
var amoYears = '';
var intRate = '';
var firstHome = false;
var newProp = false;
var totalTax = "";
var totalRebate = "";

navElement = document.getElementsByClassName("nav")
console.log(navElement)
function begin(){
    document.querySelectorAll(".screens").forEach(function(e){
        e.style.display = "none";
    })
    document.querySelectorAll(".nav").forEach(function(e){
        e.style.background = "red";
    })
    document.getElementById("screen-one").style.display = "flex";
}

function doneFirst(){
    document.querySelectorAll(".screens").forEach(function(e){
        e.style.display = "none";
    })
    document.querySelectorAll(".nav").forEach(function(e){
        e.style.background = "red";
    })
    propPrice = parseFloat(document.getElementById('prop-price').innerHTML);
    if(propPrice == '' ){
        console.log("not ready")
    }
    else{
        document.getElementById("screen-two").style.display = "flex";
        for(i=0;i<1;i++){
            navElement[i].style.background = "green";
        }
    }
}

function doneSecond(){
    document.querySelectorAll(".screens").forEach(function(e){
        e.style.display = "none";
    })
    document.querySelectorAll(".nav").forEach(function(e){
        e.style.background = "red";
    })
    amoYears = document.getElementById("years").value
    for(i=0;i<2;i++){
        navElement[i].style.background = "green";
    }
    document.getElementById("screen-three").style.display = "flex";
}

function doneThird(){
    document.querySelectorAll(".screens").forEach(function(e){
        e.style.display = "none";
    })
    document.querySelectorAll(".nav").forEach(function(e){
        e.style.background = "red";
    })
    intRate = parseFloat(document.getElementById("int-rate").innerHTML)
    for(i=0;i<3;i++){
        navElement[i].style.background = "green";
    }
    document.getElementById("screen-four").style.display = "flex";

}

function doneFourth(){
    document.querySelectorAll(".screens").forEach(function(e){
        e.style.display = "none";
    })
    document.querySelectorAll(".nav").forEach(function(e){
        e.style.background = "red";
    })
    firstHome = document.getElementById("fHome").checked;
    newProp = document.getElementById("newProp").checked;
    
    for(i=0;i<navElement.length;i++){
        navElement[i].style.background = "green";
    }
    document.getElementById("screen-final").style.display = "flex"


    calcFinal();
}



function calcFinal(){
    totalTax = calcTax(propPrice);
    if(firstHome){
        if(propPrice <= 500000){
            totalRebate = totalTax;
        }
        else if(propPrice < 525000){
            rebateCalc = propPrice - 500000;
            totalRebate = (1-rebateCalc/25000)*totalTax;
        }
        else{
            totalRebate = 0;
        }
    }
    else{
        totalRebate = 0;
    }
    totalPrice = propPrice + totalTax - totalRebate; 

    if(newProp){
        totalPrice = propPrice + totalTax + propPrice*0.05 - totalRebate;
        totalTax = totalTax + propPrice*0.05

    }
    renderData();
}

function calcTax(price){
    tax = 0;
    taxCalc = price;
    if(price <= 200000){
        tax = taxCalc * LOW_TAX_RATE;
        
    }
    else if(price <= 2000000){
        tax = 200000 * LOW_TAX_RATE;
        taxCalc -= 200000
        tax = tax + (taxCalc * MID_TAX_RATE)
    }
    else{
        tax = 200000 * LOW_TAX_RATE;
        taxCalc -= 200000
        tax = tax + (taxCalc * MID_TAX_RATE)
        taxCalc -= 2000000
        tax = tax + (taxCalc * HIGH_TAX_RATE)
    }
    return tax;
}


function renderData(){
    document.getElementById("taxTotal").innerHTML = totalTax.toFixed(2)

    document.getElementById("finalNewProp").checked = newProp;
    document.getElementById("finalFHome").checked = firstHome
    document.getElementById("rebateTotal").innerHTML = totalRebate.toFixed(2);
    document.getElementById("propPrice").innerHTML = totalPrice.toFixed(2);
    document.getElementById("amoPeriod").innerHTML = amoYears;
    document.getElementById("intRate").innerHTML = intRate.toFixed(2);
    document.getElementById("customDownAmount").innerHTML = (parseFloat(document.getElementById("customDownPerc").innerHTML)/100 * totalPrice).toFixed(2)
    document.getElementById("10DownAmount").innerHTML = (0.20 * totalPrice).toFixed(2)
    document.getElementById("15DownAmount").innerHTML = (0.30 * totalPrice).toFixed(2)
    document.getElementById("20DownAmount").innerHTML = (0.40 * totalPrice).toFixed(2)
    document.getElementById("customTotalAmount").innerHTML = (((totalPrice - parseFloat(document.getElementById("customDownAmount").innerHTML)))).toFixed(2)
    document.getElementById("10TotalAmount").innerHTML = ((totalPrice - parseFloat(document.getElementById("10DownAmount").innerHTML))).toFixed(2)
    document.getElementById("15TotalAmount").innerHTML = ((totalPrice - parseFloat(document.getElementById("15DownAmount").innerHTML))).toFixed(2)
    document.getElementById("20TotalAmount").innerHTML = ((totalPrice - parseFloat(document.getElementById("20DownAmount").innerHTML))).toFixed(2)

    document.getElementById("customMonthly").innerHTML = ((parseFloat(document.getElementById("customTotalAmount").innerHTML)/(amoYears*12))*(intRate/100+1)).toFixed(2)
    
    document.getElementById("10Monthly").innerHTML = ((parseFloat(document.getElementById("10TotalAmount").innerHTML)/(amoYears*12))*(intRate/100+1)).toFixed(2);
    
    document.getElementById("15Monthly").innerHTML = ((parseFloat(document.getElementById("15TotalAmount").innerHTML)/(amoYears*12))*(intRate/100+1)).toFixed(2)
    
    document.getElementById("20Monthly").innerHTML = ((parseFloat(document.getElementById("20TotalAmount").innerHTML)/(amoYears*12))*(intRate/100+1)).toFixed(2)
}





const selectElement = document.getElementById("years");
selectElement.addEventListener('change', () => {
    document.getElementById("inputYears").innerHTML = selectElement.value;
  });
  selectElement.addEventListener('input', () => {
    document.getElementById("inputYears").innerHTML = selectElement.value;
  });




  document.getElementById("customDownPerc").addEventListener("input", inputEvt => {
    downPay = (parseFloat(document.getElementById("customDownPerc").innerHTML)/100)* totalPrice;
    document.getElementById("customDownAmount").innerHTML = downPay;
    renderData()
  }, false)

  document.getElementById("finalFHome").addEventListener("input", inputEvt => {
    firstHome = document.getElementById("finalFHome").checked;
    document.getElementById("fHome").checked = firstHome;
    calcFinal()
  }, false)

  document.getElementById("finalNewProp").addEventListener("input", inputEvt => {
    newProp = document.getElementById("finalNewProp").checked;
    document.getElementById("newProp").checked = newProp;
    calcFinal()
  }, false)


  document.querySelector('span[contenteditable="true"]').addEventListener('keypress',function(e) {
    var x = event.charCode || event.keyCode;
    if (isNaN(String.fromCharCode(e.which)) && x!=46 || x===32 || x===13 || (x===46 && event.currentTarget.innerText.includes('.'))) e.preventDefault();
});

