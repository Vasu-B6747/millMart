export const messageValidationSchema = {
    sender: {
      in: ['body'],
      exists: { errorMessage: 'sender is required' },
      notEmpty: { errorMessage: 'sender cannot be empty' },
      isMongoId: { errorMessage: 'sender must be a valid MongoDB ObjectId' }
    },
    receiver: {
      in: ['body'],
      exists: { errorMessage: 'receiver is required' },
      notEmpty: { errorMessage: 'receiver cannot be empty' },
      isMongoId: { errorMessage: 'receiver must be a valid MongoDB ObjectId' }
    },
    equipmentId: {
      in: ['body'],
      optional: true,
      isMongoId: { errorMessage: 'equipmentId must be a valid MongoDB ObjectId' }
    },
    content: {
      in: ['body'],
      exists: { errorMessage: 'content is required' },
      notEmpty: { errorMessage: 'content cannot be empty' },
      isString: { errorMessage: 'content must be a string' },
      isLength: {
        options: { min: 1, max: 1000 },
        errorMessage: 'content must be between 1 and 1000 characters'
      }
    }
  };
  