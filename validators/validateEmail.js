const validateEmail = (email) => {
    const result = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return result;
  };
  
  module.exports = validateEmail;
  