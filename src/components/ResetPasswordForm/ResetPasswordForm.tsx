import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from '../Input/Input';
import { useForm } from 'react-hook-form';

import styles from './ResetPasswordForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import { changePassword } from '../../lib/api/user';
import { BarLoader } from 'react-spinners';

const schema = yup
  .object({
    // oldPassword: yup.string().min(5).required(),
    newPassword: yup.string().min(5).required(),
    confirmNewPassword: yup
      .string()
      .min(5)
      .oneOf([yup.ref('newPassword')], 'Lozinke se moraju poklapati'),
  })
  .required();

type Props = {};

const ResetPasswordForm = ({}: Props) => {
  const [formStatus, setFormStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      setFormStatus('loading');
      await changePassword(data.newPassword);
      setFormStatus('success');
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* <Input
        register={register}
        name='oldPassword'
        label={'Stara lozinka'}
        error={errors.oldPassword}
        type='password'
      /> */}

      <Input
        register={register}
        name='newPassword'
        label={'Nova lozinka'}
        error={errors.newPassword}
        type='password'
      />

      <Input
        register={register}
        name='confirmNewPassword'
        label={'Potvrdi novu lozinku'}
        error={errors.confirmNewPassword}
        type='password'
      />

      <Button type='submit'>
        {formStatus === 'loading' ? (
          <BarLoader color='white' />
        ) : formStatus === 'success' ? (
          'Uspesno'
        ) : (
          'Promeni lozinku'
        )}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
