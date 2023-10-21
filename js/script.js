// my Js


const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

// Creating Dropdown From Curreny code array

currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
});


currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
});

// Default currency selector

fromDropDown.value = "USD";
toDropDown.value = "INR"

let reverse = () => {
    let temp = fromDropDown.value;
    fromDropDown.value = toDropDown.value;
    toDropDown.value = temp;
};

document.querySelector("#exchange-logo").addEventListener("click", reverse);

// Showing Loading Exchnage Rate ... text as result
let resultText = () => {
    result.innerHTML = "Loading Exchnage Rate ...";
};

// convertCurrency
let convertCurrency = () => {
    const amount = document.querySelector("#amount-enter");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = 1;
        amountVal = amount.value;
    }
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;


    // if input amount field is not empty
    let api = `https://v6.exchangerate-api.com/v6/37b151d841fb39a06b38a841/latest/USD`;

    if (amountVal.length != 0) {
        fetch(api).then(resp => resp.json()).then((data) => {
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amountVal / fromExchangeRate) * toExchangeRate;

            result.innerHTML = `${amountVal} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        }).catch(() =>{
            result.innerHTML = "Something Went Wrong!!";
            setTimeout(() =>{ alert("Please Check Your Internet Connection"); }, 2000);
        });

    } else {
        alert("Enter Amount");
    }
};

document.getElementById("result").style.display = "block";

window.addEventListener("load", convertCurrency);

document
    .querySelector("#convert-btn")
    .addEventListener("click", convertCurrency);

document
    .querySelector("#convert-btn")
    .addEventListener("click", resultText);
