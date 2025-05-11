import User from "../models/userModel.js"
export const registerValidationSchema={
    name:{
        in:['body'],
        exists:{errorMessage:'name field is required'},
        notEmpty:{errorMessage:'name field should not be empty'},
        isLength:{options:{min:3,max:100},
        errorMessage:'Name size should be greater than 3'},
        trim:true,
        custom:{
                    options: async function(value){
                        const username = await User.findOne({name:{$regex:value,$options:'i'}})
                        if(!username){
                            return true;
                        }
                        throw new Error('username is already exists try new')
                    }
                }
     },
     email:{
        in:['body'],
        exists:{errorMessage:'Email field is required'},
        notEmpty:{errorMessage:'email field should not be empty'},
        isEmail:{errorMessage:'email should be valid format'},
        normalizeEmail:true,
        trim:true,
        custom:{
           options: async function(value){
            try{
                const user=await User.findOne({email:value})
                if(user){
                     throw new Error('Email is already exists try with newone')
                }

            }catch(err){
                throw new Error(err.message)
            }
            return true
           } 
        }
        
     },
     password:{
        in:['body'],
        exists:{errorMessage:'password field is required'},
        notEmpty:{errorMessage:'password field should not be  empty'},
        isStrongPassword:{options:{minLength:8,minLowercase:1,minUppercase:1,minNumber:1,minSymbol:1},
        errorMessage:'password must contain atleast one lowercase,one uppercase,one number,one symbol and minmum of 8 characters'
     },
     trim:true
    },
    role: {
        in: ['body'],
        optional: { options: { nullable: true } },
        trim: true,
        custom: {
            options: (value) => {
                const allowedRoles = ['buyer', 'seller'];
                if (value === 'admin') return true; // Let controller handle admin case
                if (!allowedRoles.includes(value)) {
                    throw new Error('Please provide a valid user type: buyer or seller');
                }
                return true;
            }
        }
    },
    address:{
        in:['body'],
        exists:{errorMessage:'address field is required'},
        notEmpty:{errorMessage:'address field should not be empty'},
        isLength:{options:{min:3,max:100},
        errorMessage:'address size should be greater than 3'},
        trim:true,

    }
    
}
//login validation
export const userLoginSchema = {
    email:{
        in:['body'],
        exists:{errorMessage:'email field is required'},
        notEmpty:{errorMessage:'email field is not empty'},
        isEmail:{errorMessage:'please provide valid format'},
        normalizeEmail:true,
        trim:true
    },
    password:{
        in:['body'],
        exists:{errorMessage:'password field is required'},
        notEmpty:{errorMessage:'password field is not empty'},
        isStrongPassword:{
            options:{minLength:8,minLowercase:1,minNumber:1,minSymbol:1,minUppercase:1}
        },
        trim:true


    } 
}