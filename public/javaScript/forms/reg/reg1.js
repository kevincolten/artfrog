// H1 Title
const errorTitle = document.getElementById("classReg");

// Selects All inputs
const inputList = document.querySelectorAll(`input`);

// If > 1 => e.preventDefault() is called
let errorSwitch = [];

// Object of Errors
const errorMsg = {
  emptyField: "is required.",
  dob: "dob example dd/mm/yyyy",
  phonePattern: "number example: 555-555-5555.",
  emailPattern: "requires a valid email.",
  zipCode: "requires 5 digits.",
  yesNo: "Please check a box."
};

// Actions performed on Submit
form.addEventListener("submit", e => {
  // Refresh List Item Errors to None on Submit
  let errorUl = document.getElementsByClassName("errorText");
  if (errorUl) {
    for (let i = 0; i < errorUl.length; i++) {
      // If error has been fixed, error field is reset to no error
      let allErrorUls = errorUl[i];
      allErrorUls.innerHTML = "";
      errorSwitch = [];
    }
  }

  // Iterate over input fields + Custom Validation / Message Creation
  for (let i = 0; i < inputList.length; i++) {
    // Create variable for inputListField
    let inputListField = inputList[i];

    // Reset Aria
    inputListField.setAttribute("aria-invalid", false);

    // Empty Field Errors
    if (detectEmptyField(inputListField)) {
      let errMsg = `Error: ${inputListField.title} ${errorMsg.emptyField}`;
      makeError(inputListField, errMsg);
    } else {
      removeError(inputListField);
    }

    let detectEmailError = () => {
      // For Email Address Pattern
      let emailInput = document.querySelectorAll("input[type=email]");
      let emailValue = emailInput[0].value;

      const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (
        inputListField.type === "email" &&
        inputListField.value !== "" &&
        !re.test(String(emailValue).toLowerCase())
      ) {
        let errMsg = `Error: ${inputListField.title} ${errorMsg.emailPattern}` 
        makeError(inputListField, errMsg)
      }
    };

    detectEmailError()

    // detectEmailError(inputListField);

    // For Phone Number Pattern

    // For Zip Code pattern / length
  }

  // Set Focuspoint on First Error field
  let firstErrorInput = document.getElementsByClassName("errorBox");
  const focusPoint = firstErrorInput[0];
  focusPoint.focus();

  // If Error Stop Submit page, call Display Errors
  if (errorSwitch.length > 0) {
    e.preventDefault();
    // displayErrors();
  }
});

// Detect if there is an error in the input field
let detectEmptyField = inputListField => {
  // For Empty Input Fields
  if (
    (inputListField.type === "text" && inputListField.value === "") ||
    (inputListField.type === "email" && inputListField.value === "")
  ) {
    return true;
  }
};

// Make the error show under the fields.
let makeError = (inputListField, errMsg) => {
  errorSwitch.push("Error");

  // Set Aria Attributes to
  inputListField.setAttribute("aria-invalid", true);
  inputListField.setAttribute("aria-describeby", "errorIdForAria");

  // Create unordered list and class .errorText
  const list = document.createElement("ul");
  list.className = "errorText";

  // Create List Item
  let listItem = document.createElement("li");
  // Give list item ID
  listItem.id = "errorIdForAria";
  let listValue = document.createTextNode(`${errMsg}`);

  // Add list Value to li
  listItem.append(listValue);

  // Append li to ul
  list.appendChild(listItem);

  // Create variables for parent Div of ul
  let parentDiv = inputListField.parentNode;

  // Append ul to parentDiv
  parentDiv.appendChild(list);

  // Add ErrorBox CSS styling to input field
  inputListField.className = "errorBox";
};

let removeError = inputListField => {
  inputListField.setAttribute("aria-invalid", false);
  inputListField.classList.remove("errorBox");
  inputListField.removeAttribute("aria-describeby", "errorIdForAria");

  // Attempting to remove errorText UL....
  // let errorUl = document.getElementsByClassName("errorText");
  // let parentDiv = errorUl.parentNode;
  // parentDiv.removeChild(errorUl);
};
