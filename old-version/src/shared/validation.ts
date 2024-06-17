export const validationRules = {
  name: {
    required: 'Please enter the required field',
    maxLength: { value: 32, message: 'Max Length Is 32 Characters' },
  },
  symbol: {
    required: 'Please enter the required field',
    maxLength: { value: 10, message: 'Max Length Is 10 Characters' },
  },
  description: {
    required: 'Please enter the required field',
  },
  share: {
    min: { value: 0, message: 'Minimum value is 0' },
    max: { value: 100, message: 'Maximum value is 100' },
  },
  royalty: {
    min: { value: 0, message: 'Minimum value is 0' },
    max: { value: 100, message: 'Maximum value is 100' },
  },
};
