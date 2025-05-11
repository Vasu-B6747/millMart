export const forgotPasswordValidation={
    email:{
        in:['body'],
        exists:{errorMessage:'Email field is required'},
        notEmpty:{errorMessage:'email field should not be empty'},
        isEmail:{errorMessage:'email should be valid format'},
        normalizeEmail:true,
        trim:true
    }
}
export const resetPasswordValidation={
    password:{
        in:['body'],
        exists:{errorMessage:'password field is required'},
        notEmpty:{errorMessage:'password field should not be  empty'},
        isStrongPassword:{options:{minLength:8,minLowercase:1,minUppercase:1,minNumber:1,minSymbol:1},
        errorMessage:'password must contain atleast one lowercase,one uppercase,one number,one symbol and minmum of 8 characters'
     },
     trim:true
    },
    confirmPassword:{
        in:['body'],
        exists:{errorMessage:'confirmPassword field is required'},
        notEmpty:{errorMessage:'confirmPassword field should not be  empty'},
        isStrongPassword:{options:{minLength:8,minLowercase:1,minUppercase:1,minNumber:1,minSymbol:1},
        errorMessage:'confirmPassword must contain atleast one lowercase,one uppercase,one number,one symbol and minmum of 8 characters'
     },
     trim:true
    }
}