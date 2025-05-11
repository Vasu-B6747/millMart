export const updateReviewValidation = {
    rating: {
      in: ['body'],
      optional: true,
      isInt: {
        options: { min: 1, max: 5 },
        errorMessage: 'Rating must be between 1 and 5'
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
  