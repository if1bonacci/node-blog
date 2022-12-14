export default class BaseController {
  handlerErrors = function (err: any) {
    console.log(err)

    type dataErrorType = {
      status: number;
      errors: Record<string, string>;
    }

    const data: dataErrorType = {
      status: 500,
      errors: {}
    };

    if (err.message.includes('Validation failed')) {
      Object.values(err.errors).forEach((properties: any) => {
        data.errors[properties.path] = properties.message;
      });
    } else if (err.code === 11000) {
      for (const [key, value] of Object.entries(err.keyValue)) {
        data.errors[key] = `The ${key}: ${value} has already used. The ${key} should be unique.`;
      }
    } else {
      data.errors['server'] = 'Unexpected server error!'
    }

    return data;
  }
}
