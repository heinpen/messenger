import * as yup from 'yup';
import Form from './Form';

type FormData = {
  [key: string]: string;
};

const emailValidation = {
  required: 'This field is required.',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'Invalid email address.',
  },
};

const schema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  email: yup
    .string()
    .required(emailValidation.required)
    .matches(emailValidation.pattern.value, emailValidation.pattern.message),
  password: yup.string().required('Password is required.'),
});

const RegisterForm = () => {
  const handleRegisterSubmit = (formData: FormData) => {
    // Handle registration submission here with formData
    console.log('Registration form data:', formData);
  };

  const registerFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const buttonLabel = 'Register';

  return (
    <Form
      fields={registerFields}
      onSubmit={handleRegisterSubmit}
      buttonLabel={buttonLabel}
      schema={schema}
    />
  );
};

export default RegisterForm;
