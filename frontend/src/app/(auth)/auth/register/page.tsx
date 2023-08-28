import TitleContainer from '@/components/auth/AuthHeader';
import AuthLinkWrapper from '@/components/auth/AuthLinkWrapper';
import RegisterForm from '@/components/auth/RegisterForm';
import type { FC } from 'react';

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <TitleContainer title="Create you account"></TitleContainer>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />

          <AuthLinkWrapper
            label="Already have an account?"
            link="Login"
            to="/auth/login"
          />
        </div>
      </div>
    </div>
  );
};
export default Register;
