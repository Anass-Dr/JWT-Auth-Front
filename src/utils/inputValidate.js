import { object, string, ref } from 'yup';

const schemas = {
    username: string().required().min(3).max(20),
    email: string().email().required(),
    password: string()
        .required()
        .min(8)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: string().required().oneOf([ref('password'), null], 'Passwords must match'),
    phone: string().required().min(10).max(10).matches(/^[0-9]+$/, 'Phone number must be a valid 10-digit number'),
    address: string().required(),
    otp: string().required().min(4).max(4).matches(/^[0-9]+$/, 'OTP must be a valid 4-digit number'),
}

const genSchema = (inputs) => {
    const schema = {};
    inputs.forEach(input => {
        schema[input] = schemas[input];
    });
    return object(schema);
}

async function validate(data, inputs) {
    return await genSchema(inputs).validate(data);
}

export default validate;