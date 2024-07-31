function validateEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Check if the email matches the regex pattern
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Check password length
  if (password.length < 8) {
    return false;
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return false;
  }

  // Check for at least one alphabet
  if (!/[a-zA-Z]/.test(password)) {
    return false;
  }

  // Check for at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }

  return true;
}

export {validateEmail, validatePassword};
