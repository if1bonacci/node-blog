class BaseController {
  constructor() {}
  handlerErrors = function (err) {
    console.log(err)

    let data = {
      status: 500,
      errors: {}
    };

    if (err.message.includes('Validation failed')) {
      Object.values(err.errors).forEach(({properties}) => {
        data.errors[properties.path] = properties.message;
      });
    } else if (err.code === 11000) {
      for (let [key, value] of Object.entries(err.keyValue)) {
        data.errors[key] = `The ${key}: ${value} has already used. The ${key} should be unique.`;
      }
    } else {
      data.errors['server'] = 'Unexpected server error!'
    }

    return data;
  }
}

export default BaseController;
