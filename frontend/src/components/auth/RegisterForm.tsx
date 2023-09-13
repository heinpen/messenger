'use client';

import { registerUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import * as yup from 'yup';
import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';
import Form from './Form';

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  email: yup
    .string()
    .required('This field is required.')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Invalid email address.',
    ),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  password: yup.string().required('Password is required.'),
});

const RegisterForm = () => {
  const router = useRouter();
  const { trigger, error, isMutating, data, reset } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/register`,
    registerUser,
  );

  useEffect(() => {
    if (data) router.push('/auth/login');
  }, [data, router]);

  const handleRegisterSubmit = (formData: RegistrationFormData) => {
    // Handle registration submission here with formData
    trigger(formData);
  };

  const registerFields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'firstName', label: 'First name', type: 'text' },
    { name: 'lastName', label: 'Last name', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const buttonLabel = 'Register';

  return (
    <>
      {isMutating && (
        <div className="flex align-center justify-center mb-5">
          <Spinner />
        </div>
      )}
      {error && !isMutating && (
        <Alert message={data.message} className={'mb-6'} handleClose={reset} />
      )}
      {data && !isMutating && (
        <Alert
          message={data.message}
          className={'mb-6'}
          handleClose={reset}
          type={'success'}
        />
      )}
      <Form
        fields={registerFields}
        onSubmit={handleRegisterSubmit}
        buttonLabel={buttonLabel}
        schema={schema}
      />
    </>
  );
};

export default RegisterForm;
