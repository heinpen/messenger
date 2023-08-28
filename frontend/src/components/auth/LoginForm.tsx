'use client';

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
  email: yup
    .string()
    .required(emailValidation.required)
    .matches(emailValidation.pattern.value, emailValidation.pattern.message),
  password: yup.string().required('Password is required.'),
  remember: yup.boolean(),
});

const LoginForm = () => {
  const handleLoginSubmit = (formData: FormData) => {
    // Handle login submission here with formData
    console.log('Login form data:', formData);
  };

  const loginFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'remember', label: 'Remember me', type: 'checkbox' },
  ];

  const buttonLabel = 'Login';

  return (
    <Form
      fields={loginFields}
      onSubmit={handleLoginSubmit}
      buttonLabel={buttonLabel}
      schema={schema}
    />
  );
};

export default LoginForm;
