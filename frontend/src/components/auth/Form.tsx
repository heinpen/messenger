'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormData } from './LoginForm';
import { RegistrationFormData } from './RegisterForm';

// Define the type for the fields array
type Field = {
  name: string;
  label: string;
  type: string;
};

interface FormProps {
  fields: Field[];
  buttonLabel: string;
  schema: any;
}

interface LoginFormProps extends FormProps {
  onSubmit: (formData: LoginFormData) => void;
}

interface RegistrationFormProps extends FormProps {
  onSubmit: (formData: RegistrationFormData) => void;
}

type CommonFormProps = LoginFormProps | RegistrationFormProps;

const Form: FC<CommonFormProps> = ({
  fields,
  onSubmit,
  buttonLabel,
  schema,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FieldValues> = (formData) => {
    onSubmit(formData as LoginFormData | RegistrationFormData);
  };

  function createInputField(field: Field) {
    return (
      <div key={field.name}>
        <label
          htmlFor={field.name}
          className={`block text-sm font-medium text-gray-700 ${
            errors[field.name] ? 'text-red-700' : ''
          }`}
        >
          {field.label}
        </label>

        <input
          type={field.type}
          id={field.name}
          className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 ${
            errors[field.name] ? 'border-red-300' : ''
          }`}
          {...register(field.name)}
        />
        {errors[field.name] && (
          <span className="font-medium text-red-500">
            {errors[field.name]?.message?.toString()}
          </span>
        )}
      </div>
    );
  }

  function createCheckboxField(field: Field) {
    return (
      <div key={field.name} className="flex items-center">
        <input
          type={field.type}
          id={field.name}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          {...register(field.name)}
        />
        <label
          htmlFor={field.name}
          className="ml-2 block text-sm text-gray-900"
        >
          {field.label}
        </label>
      </div>
    );
  }

  function createFormItem(field: Field) {
    return field.name === 'remember'
      ? createCheckboxField(field)
      : createInputField(field);
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {fields.map(createFormItem)}

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
};

export default Form;
