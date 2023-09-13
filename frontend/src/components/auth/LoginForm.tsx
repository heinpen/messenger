'use client';

import { loginUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import * as yup from 'yup';
import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';
import Form from './Form';

export type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
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
  const router = useRouter();
  const { trigger, error, isMutating, data, reset } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/login`,
    loginUser,
  );

  useEffect(() => {
    if (data) router.push('/');
  }, [data, router]);

  const handleLoginSubmit = (formData: LoginFormData) => {
    trigger(formData);
  };

  const loginFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'remember', label: 'Remember me', type: 'checkbox' },
  ];

  const buttonLabel = 'Login';

  return (
    <>
      {isMutating && (
        <div className="flex align-center justify-center mb-5">
          <Spinner />
        </div>
      )}
      {error && !isMutating && (
        <Alert
          message={error.message}
          className={'mb-6'}
          handleClose={reset}
          type={'error'}
        />
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
        fields={loginFields}
        onSubmit={handleLoginSubmit}
        buttonLabel={buttonLabel}
        schema={schema}
      />
    </>
  );
};

export default LoginForm;
