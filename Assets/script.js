// Function getPasswordCriteria for getting user's desired password criteria and giving an error message if the length is too short, too long, or not a whole number.

function getPasswordCriteria() {

  // The acceptance criteria specifies that when clicking the button "generate password", the user will be presented with the following prompts for password criteria:
 
  var includeLowercase = confirm("Would you like your password to include lowercase characters?");
  var includeUppercase = confirm("Would you like your password to include uppercase characters?");
  var includeNumeric = confirm("Would you like your password to include numeric characters?");
  var includeSpecialChars = confirm("Would you like your password to include special characters?");

// Sends alert if no character type is selected and ends the getPasswordCriteria() function with return. The user will have to click generate password again.

  if (!includeLowercase && !includeUppercase && !includeNumeric && !includeSpecialChars) {
    alert("At least one character type must be selected. Please click 'generate password' button to try again.");
    return;
  }

// Prompting for length of the password as the acceptance criteria requires with at least 8 and no more than 128 characters.

  var length = prompt("How long do you want your password to be? (Enter a number from 8 - 128):");

// Sends alert if user input is not a number, an integer, is less than 8, or more than 128 and ends the getPasswordCriteria() function with return. The user will have to click generate password again.
  
  if (isNaN(length) || !Number.isInteger(+length) || length < 8 || length > 128) {
    alert("Password length must be a whole number from 8 to 128. Please click 'generate password' button to try again");
    return;
  }

// returns password criteria for this function that will be stored in the var criteria (line 103)

  return {
    length,
    includeLowercase,
    includeUppercase,
    includeNumeric,
    includeSpecialChars,
  };
}

// generatePassword(criteria) generates a random password based on the criteria variable that was taken from getPasswordCriteria() function above

function generatePassword(criteria) {
  var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numericChars = "0123456789";
  var specialChars = "!@#$%^&*()[]{}_-+~`.,:;<>?";
  
  var password = "";

  // Created selectRandomChar function to select a random character from user-selected character types. Used the charAt method to randomize selection from the variable strings.
 
  function selectRandomChar(characters) {
    var randomChar = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomChar);
  }

  // Ensured at least one character from each selected type will be used in the password.

  if (criteria.includeLowercase) {
    password += selectRandomChar(lowercaseChars);
  }
  if (criteria.includeUppercase) {
    password += selectRandomChar(uppercaseChars);
  }
  if (criteria.includeNumeric) {
    password += selectRandomChar(numericChars);
  }
  if (criteria.includeSpecialChars) {
    password += selectRandomChar(specialChars);
  }

  // Determined the remaining length

  var remainingLength = criteria.length - password.length;

  // Combined all selected character types into one pool for the remaining password

  var selectedChars = "";

  if (criteria.includeLowercase) {
    selectedChars += lowercaseChars;
  }
  if (criteria.includeUppercase) {
    selectedChars += uppercaseChars;
  }
  if (criteria.includeNumeric) {
    selectedChars += numericChars;
  }
  if (criteria.includeSpecialChars) {
    selectedChars += specialChars;
  }

  // Added randomly selected characters from the selected pool to meet the remaining length

  for (let i = 0; i < remainingLength; i++) {
    var randomChars = selectRandomChar(selectedChars);
    password += randomChars;
  }

  return password;
}

// Function needed to display the generated password

function displayPassword(password) {
  var passwordText = document.getElementById("password");
  passwordText.value = password;
}

var generateButton = document.getElementById("generate");

// Event listener for the "Generate Password" button

generateButton.addEventListener("click", function () {
  var criteria = getPasswordCriteria();
  if (criteria) {
    var password = generatePassword(criteria);
    displayPassword(password);
  }
});