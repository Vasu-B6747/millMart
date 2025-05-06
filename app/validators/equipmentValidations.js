export const equipmentValidationSchema={
    // seller:{
    //     in:['body'],
    //     exists:{errorMessage:'seller field is required'},
    //     notEmpty:{errorMessage:'seller field is not empty'},
    //     isMongoId:{errorMessage:'please provide valid mongoid'}
    // },
    title:{
        in:['body'],
        exists:{errorMessage:'title field is required'},
        notEmpty:{errorMessage:'title field is not empty'},
    },
    price: {
        in: ['body'],
        exists: {
            errorMessage: 'price is required'
        },
        notEmpty: {
            errorMessage: 'price cannot be empty'
        },
        isFloat: {
            errorMessage: 'price should be minimum 1',
            options: { min: 1}
        }
    },
    description:{
        in:['body'],
        exists:{errorMessage:'description field is required'},
        notEmpty:{errorMessage:'description field is not empty'},
    },
    brand:{
        in:['body'],
        exists:{errorMessage:'brand field is required'},
        notEmpty:{errorMessage:'brand field is not empty'},
    },
    model:{
        in:['body'],
        exists:{errorMessage:'model field is required'},
        notEmpty:{errorMessage:'model field is not empty'},
    },
    yearManufactured:{
        in:['body'],
        exists:{errorMessage:'yearManufactured field is required'},
        notEmpty:{errorMessage:'yearManufactured field is not empty'},
    },
    condition:{
        in:['body'],
        exists:{errorMessage:'condition field is required'},
        notEmpty:{errorMessage:'condition field is not empty'},
        isIn:{
            options:[['new','used']],
            errorMessage:'Please provide condition either be new or used'
        }
    },
    photos:{
        in:['body'],
        exists:{errorMessage:'photos field is required'},
        notEmpty:{errorMessage:'photos field is not empty'},
        isArray: {
            options: { min: 1, max: 5 },
            errorMessage: 'photos should be an array of 1 to 5 items'
        },
        custom: {
            options: (value) => value.every(url => typeof url === 'string' && url.trim() !== ''),
            errorMessage: 'Each photo must be a non-empty string'
        }
    },
    equipmentType:{
        in:['body'],
        exists:{errorMessage:'equipmentType field is required'},
        notEmpty:{errorMessage:'equipmentType field is not empty'},
        isIn:{
            options:[['de-husker', 'dryer', 'polisher', 'other']],
            errorMessage:'Please provide a valid type'
        }
    },
    location: {
        in: ['body'],
        custom: {
          options: (value) => {
            return (
              value &&
              typeof value === 'object' &&
              value.type === 'Point' &&
              Array.isArray(value.coordinates) &&
              value.coordinates.length === 2 &&
              typeof value.coordinates[0] === 'number' &&
              typeof value.coordinates[1] === 'number' &&
              typeof value.address === 'string' &&
              value.address.trim() !== ''
            );
          },
          errorMessage: 'location must be a valid GeoJSON Point with address and coordinates [lng, lat]'
        }
      }
      
}