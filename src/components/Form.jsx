import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Form.module.css';

 const schema = yup.object().shape({
   firstName: yup.string().required(),
   lastName: yup.string().required(),
   email: yup.string().email().required(),
   age: yup.number().positive().integer().required(),
   password: yup.string().min(4).max(16).required(),
   confirmPassword: yup.string().oneOf([yup.ref("password"), null])
 })

const Form = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const formSubmit = (data) => {
    // if you pass validation look up in console for submmited data
    console.log(data);

    // reset your input fileds if submitting was successful
    reset({
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <>
      <div className={styles['form']}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className={styles['input-wrapper']}>
            <input type="text" name="firstName" placeholder="First Name..." {...register('firstName')} />
            <p>{errors.firstName?.message}</p>
          </div>
          <div className={styles['input-wrapper']}>
            <input type="text" name="lastName" placeholder="Last Name..." {...register('lastName')} />
            <p>{errors.lastName?.message}</p>
          </div>
          <div className={styles['input-wrapper']}>
            <input type="text" name="email" placeholder="Email..." {...register('email')} />
            <p>{errors.email?.message}</p>
          </div>
          <div className={styles['input-wrapper']}>
            <input type="text" name="age" placeholder="Age..." {...register('age')} />
            <p>{errors.age?.message}</p>
          </div>
          <div className={styles['input-wrapper']}>
            <input type="password" name="password" placeholder="Password..." {...register('password')} />
            <p>{errors.password?.message}</p>
          </div>
          <div className={styles['input-wrapper']}>
            <input type="password" name="confirmPassword" placeholder="Confirm Password..." {...register('confirmPassword')} />
            <p>{errors.confirmPassword && "Passwords should match!"}</p>
          </div>
          <input type="submit" name="Submit" className={styles['btn']} />
        </form>
      </div>
    </>
  );
}

export default Form;