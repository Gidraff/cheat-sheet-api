const validator = require('email-validator')

module.exports = {
  isEmailValid: function({email}) {
    if(validator.validate(email)) return true
    return false
  },
  isPasswordValid: function({ password, passwordConf}) {
    if (password && password.trim().length >= 8) {
      if (password === passwordConf) {
        return true
      }
      return false
    }
    return false
  }
}
