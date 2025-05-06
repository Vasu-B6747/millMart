export const createPaymentValidation = {
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
    amount: {
      in: ['body'],
      exists: { errorMessage: 'Amount is required' },
      notEmpty: { errorMessage: 'Amount cannot be empty' },
      isFloat: {
        options: { min: 1 },
        errorMessage: 'Amount must be a number greater than 0'
      }
    },
    paymentMethod: {
      in: ['body'],
      exists: { errorMessage: 'Payment method is required' },
      notEmpty: { errorMessage: 'Payment method cannot be empty' },
      isIn: {
        options: [['razorpay', 'stripe', 'bank_transfer']],
        errorMessage: 'Invalid payment method'
      }
    }
  };
  