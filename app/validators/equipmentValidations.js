export const equipmentValidationSchema={
    seller:{
        in:['body'],
        exists:{errorMessage:'seller field is required'},
        notEmpty:{errorMessage:'seller field is not empty'},
        isMongoId:{errorMessage:'please provide valid mongoid'}
    },
    title:{
        in:['body'],
        exists:{errorMessage:'title field is required'},
        notEmpty:{errorMessage:'seller field is not empty'},
    }
}