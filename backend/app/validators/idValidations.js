export const idValidationSchema={
    id:{
        in:['params'],
        isMongoId:{errorMessage:'Please provide valid mongoid'}
    }
}