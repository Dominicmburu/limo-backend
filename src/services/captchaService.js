const axios = require('axios');

async function verifyCaptcha(token) {
  const secret = '6Le29AcrAAAAANClJ1ZjRca94sVEnvbjT1DbRhHq';
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );
  return response.data.success;
}

module.exports = { verifyCaptcha };
