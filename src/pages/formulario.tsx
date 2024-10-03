import { useForm } from 'react-hook-form';
import styles from '@/styles/formulario.module.css';
import { useState } from 'react';

interface IFormInput {
  name: string;
  email: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: IFormInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const result = await response.json();
      console.log('User created:', result);

      alert(
        `User created successfully!\nName: ${result.name}\nEmail: ${result.email}`
      );
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <input
              type="email"
              placeholder="E-mail"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <button type="submit" data-type="confirm" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Enviar'}
          </button>

          {serverError && <span className={styles.error}>{serverError}</span>}
        </form>
      </div>
    </div>
  );
}
