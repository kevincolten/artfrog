// import axios from "axios";

// H1 Title
const errorTitle = document.getElementById("classReg");

// Selects All inputs
const inputList = document.querySelectorAll(`input`);

// If > 1 => e.preventDefault() is called
let errorSwitch = [];

// Object of Error Messages
const errorMsg = {
  emptyField: "is required.",
  dob: "Please enter a valid DOB: example dd/mm/yyyy",
  phonePattern: "number example: 555-555-5555.",
  emailPattern: "requires a valid email.",
  zipPattern: "requires 5 digits.",
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
      const errMsg = `Error: ${inputListField.title} ${errorMsg.emptyField}`;
      makeError(inputListField, errMsg);
    } else {
      removeError(inputListField);
    }

    // For DOB Pattern
    if (detectDobError(inputListField)) {
      const errMsg = `Error: ${inputListField.title} ${errorMsg.dob}`;
      makeError(inputListField, errMsg);
    }

    // For Phone Number Pattern
    // detectPhoneError(inputListField);
    if (detectPhoneError(inputListField)) {
      const errMsg = `Error: ${inputListField.title} ${errorMsg.phonePattern}`;
      makeError(inputListField, errMsg);
    }

    // Email Formatting Error
    if (detectEmailError(inputListField)) {
      const errMsg = `Error: ${inputListField.title} ${errorMsg.emailPattern}`;
      makeError(inputListField, errMsg);
    }

    // For Zip Code pattern / length
    if (detectZipError(inputListField)) {
      const errMsg = `Error: ${inputListField.title} ${errorMsg.zipPattern}`;
      makeError(inputListField, errMsg);
    }

    // emptyCheckBoxes(inputListField);
    // For Empty Checkboxes
    // if (photoCheckBoxes(inputListField)) {
    //   const errMsg = `Error: ${inputListField.title}`;
    //   console.log("hi");
    //   makeError(inputListField, errMsg);
    // }
    if (photoCheckBoxes(inputListField)) {
      const errMsg = "test";
      makeError(inputListField, errMsg);
    }
  }

  // Set Focuspoint on First Error field
  let firstErrorInput = document.getElementsByClassName("errorBox");
  const focusPoint = firstErrorInput[0];
  focusPoint.focus();

  // If Error Stop Submit page, call Display Errors
  if (errorSwitch.length > 0) {
    e.preventDefault();
    // TEMPORARY call Position for updated info *will call afer } else { once form code completed
    handleSubmit();
  }
});

// Detect if there is an error in the input field
let detectEmptyField = inputListField => {
  let notRequired = inputListField.classList.contains("noRequire");
  // For Empty Input Field
  if (
    (!notRequired &&
      (inputListField.type === "text" && inputListField.value === "")) ||
    (inputListField.type === "email" && inputListField.value === "")
  ) {
    return true;
  }
};

let detectDobError = inputListField => {
  let dobInput = document.querySelectorAll("input[name=studentDOB]");
  let dobValue = dobInput[0].value;
  // let dobInput = inputListField;

  const re = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;

  if (
    inputListField.name === "studentDOB" &&
    inputListField.value !== "" &&
    !re.test(String(dobValue))
  ) {
    return true;
  }
};

let detectEmailError = inputListField => {
  // For Email Address Pattern
  let emailInput = document.querySelectorAll("input[type=email]");
  let emailValue = emailInput[0].value;

  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (
    inputListField.type === "email" &&
    inputListField.value !== "" &&
    !re.test(String(emailValue).toLowerCase())
  ) {
    return true;
  }
};

let detectZipError = inputListField => {
  // For Email Address Pattern
  let zipInput = document.querySelectorAll("input[name=zipCode]");
  let zipValue = zipInput[0].value;

  const re = /^[0-9]{5}(?:-[0-9]{4})?$/;

  if (
    inputListField.name === "zipCode" &&
    inputListField.value !== "" &&
    !re.test(String(zipValue))
  ) {
    return true;
  }
};

let detectPhoneError = inputListField => {
  let phoneInput = inputListField;

  const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  if (
    inputListField.name === "phone" &&
    inputListField.value !== "" &&
    !re.test(String(phoneInput.value))
  ) {
    return true;
  }
};

let photoCheckBoxes = inputListField => {
  const box = inputListField;
  const checked = box.checked;
  const photoBox = document.querySelectorAll("input[type=checkbox]");
  const photoClass = inputListField.classList.contains("photoClass");
  const photoBoxYes = photoBox[2];
  const photoBoxNo = photoBox[3];

  console.log(photoClass)

  if (checked === photoClass && photoBoxYes.checked === false && photoBoxNo.checked === false) {
    return true;
  }
};

// Make the error show under the fields.
let makeError = (inputListField, errMsg) => {
  errorSwitch.push("Error");

  // Set Aria Attributes to
  inputListField.setAttribute("aria-invalid", true);
  inputListField.setAttribute("aria-describedby", "errorIdForAria");

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
  inputListField.removeAttribute("aria-describedby", "errorIdForAria");

  // Attempting to remove errorText UL....
  // let errorUl = document.getElementsByClassName("errorText");
  // let parentDiv = errorUl.parentNode;
  // parentDiv.removeChild(errorUl);
};

const handleSubmit = () => {
  // const newUser = {
  //   first_name: "",
  //   last_name: "",
  //   guardian_first_name: "",
  //   guardian_last_name: "",
  //   student_DOB: "",
  //   phone: "",
  //   email: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   zip: "",
  //   pickup_first_name: "",
  //   pickup_last_name: "",
  //   pickup_phone: "",
  //   pickup_relation_to_student: "",
  //   physician_name: "",
  //   physician_phone: "",
  //   emergency_permission: "",
  //   photo_permission: "",
  //   class_id: ""
  // };

  const inputList = document.querySelectorAll("input");

  let newUser = {};
  for (let i = 0; i < inputList.length; i++) {
    // Create variable for inputListField
    let inputListField = inputList[i];
    if (inputListField.type !== "checkbox") {
      newUser[inputListField.title] = inputListField.value;

      // If Prefer Data as Array of Objects
      // const field = { [inputListField.title]: inputListField.value };
      // userArr.push(field);
    }
  }

  for (let i = 0; i < inputList.length; i++) {
    let inputListField = inputList[i];
    if (inputListField.type === "checkbox" && inputListField.checked) {
      newUser[inputListField.title] = inputListField.checked;

      // If Prefer Data as Array of Objects
      // const field = { [inputListField.title]: inputListField.checked };
      // userArr.push(field);
    }
  }

  console.log(newUser);
  // const testUser = {};

  // axios.post(endpoint, newUser)
};
