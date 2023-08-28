
import AuthHeader from '@/components/auth/AuthHeader';
import AuthLinkWrapper from '@/components/auth/AuthLinkWrapper';
import AuthLoginFooter from '@/components/auth/AuthLoginFooter';
import LoginForm from '@/components/auth/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messenger login',
};

export default function Login() {
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthHeader title="Sign in to your account" />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />

          <AuthLoginFooter />
          <AuthLinkWrapper
            label="Do not have an account?"
            link="Register"
            to="/auth/register"
          />
        </div>
      </div>
    </div>
  );
}
