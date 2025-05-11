export const createReviewValidation = {
    buyer: {
      in: ['body'],
      exists: { errorMessage: 'Buyer is required' },
      notEmpty: { errorMessage: 'Buyer cannot be empty' },
      isMongoId: { errorMessage: 'Buyer must be a valid MongoDB ObjectId' }
    },
    seller: {
      in: ['body'],
      exists: { errorMessage: 'Seller is required' },
      notEmpty: { errorMessage: 'Seller cannot be empty' },
      isMongoId: { errorMessage: 'Seller must be a valid MongoDB ObjectId' }
    },
    equipmentId: {
      in: ['body'],
      exists: { errorMessage: 'Equipment ID is required' },
      notEmpty: { errorMessage: 'Equipment ID cannot be empty' },
      isMongoId: { errorMessage: 'Equipment ID must be a valid MongoDB ObjectId' }
    },
    rating: {
      in: ['body'],
      exists: { errorMessage: 'Rating is required' },
      isInt: {
        options: { min: 1, max: 5 },
        errorMessage: 'Rating must be an integer between 1 and 5'
      }
    },
    reviewText: {
      in: ['body'],
      optional: true,
      isString: { errorMessage: 'Review text must be a string' },
      isLength: {
        options: { max: 1000 },
        errorMessage: 'Review text can be at most 1000 characters'
      },
      trim: true
    }
  };
  