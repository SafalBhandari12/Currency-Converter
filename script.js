const base_url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdown_select = document.body.querySelectorAll(".dropdown select");
let button = document.body.querySelector("button");
let input_amount = document.body.querySelector(".amount input");
let message_p = document.body.querySelector(".mes p");

for (let select of dropdown_select) {
  for (let code in countryList) {
    let new_option = document.createElement("option");
    new_option.innerText = code;
    new_option.value = code;
    if (select.name == "from" && code == "USD") {
      new_option.selected = "selected";
    }
    if (select.name == "to" && code == "INR") {
      new_option.selected = "selected";
    }
    select.append(new_option);
  }
  select.addEventListener("change", (evt) => {
    update_flag(evt.target);
  });
}
const update_flag = (evt) => {
  let img = evt.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryList[evt.value]}/flat/64.png`;
};
button.addEventListener("click", async (evt) => {
  let from_value = document.body
    .querySelector(".from select")
    .value.toLowerCase();
  let to_value = document.body.querySelector(".to select").value.toLowerCase();
  evt.preventDefault();
  if (input_amount.value == 0 || input_amount.value == "") {
    alert("The amount must be given");
    input_amount.value = 1;
  } else {
    const url = `${base_url}/${from_value}.json`;
    let temp_dict = await fetch(url);
    let dict = await temp_dict.json();
    let converted_value = (
      dict[from_value][to_value] * input_amount.value
    );
    if(converted_value >0){
        converted_value = converted_value.toFixed(2);
    }else{
        converted_value = converted_value.toFixed(4);
    }
    message_p.innerText = `${input_amount.value} ${from_value} = ${converted_value} ${to_value} `;
  }
});
