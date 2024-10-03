import { object, string } from 'yup';

const schemas = {
    username: string().required().min(3).max(20),
    email: string().email().required(),
    password: string()
        .required()
        .min(8)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number'),
    phone: string().required().min(10).max(10).matches(/^[0-9]+$/, 'Phone number must be a valid 10-digit number'),
    address: string().required(),
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