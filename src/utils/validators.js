module.exports = {
    isValidPhoneNumber: (phone) => {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(phone);
    },
  
  };
  