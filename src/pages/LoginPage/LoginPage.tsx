import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';

import BarLoader from 'react-spinners/BarLoader';

import { useLogin, useUser } from '../../lib/auth';

import styles from './LoginPage.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Navigate } from 'react-router';
// import { ScaleLoader } from 'react-spinners';
import { LoginCredentials } from '../../entities/interfaces';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .required();

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const login = useLogin();
  const user = useUser();

  const onSubmit = (data: LoginCredentials) => {
    console.log(data);
    login.mutate(data);
  };

  // if (user.isLoading)
  //   return (
  //     <div className='h-100vh full-width flex flex-center'>
  //       <ScaleLoader
  //         color='#ffffff'
  //         height={50}
  //         loading
  //         margin={2}
  //         radius={5}
  //         width={10}
  //       />
  //     </div>
  //   );

  if (user.data) return <Navigate to='/' />;

  return (
    <div className='flex flex-center h-100vh'>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name='email'
          label={'Email'}
          error={errors.email}
        />

        <Input
          register={register}
          name='password'
          label={'Password'}
          error={errors.password}
          type='password'
        />

        <Button type='submit'>
          {login.isLoading ? <BarLoader color='white' /> : 'Uloguj se'}
        </Button>
        {login.error && login.error.message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.errorMessage}
          >
            {login.error.message}
          </motion.p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
