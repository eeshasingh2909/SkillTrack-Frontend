import { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

import FormInput from '../common/FormInput';
import SparkleButton from '../common/SparkleButton';
import { useRegister } from '../../hooks/useAuth';
import {
  GlassCard,
  CardTitle,
  CardSubtitle,
  FormAlert,
  FooterText,
  AuthNavLink,
} from './RegisterForm.styles';

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormState {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

const EMPTY_FORM: FormState = { username: '', email: '', password: '', confirm: '' };

// ─── Component ───────────────────────────────────────────────────────────────
export default function RegisterForm() {
  const { mutate: register, isPending, error } = useRegister();

  const [form, setForm]         = useState<FormState>(EMPTY_FORM);
  const [localError, setLocalError] = useState('');

  // Show local validation errors first, then API errors
  const errorMsg = localError || (error instanceof Error ? error.message : '');

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      if (localError) setLocalError('');
    };
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.username.trim()) { setLocalError('Username is required.'); return; }
    if (!form.email.trim())    { setLocalError('Email is required.');    return; }
    if (!form.password)        { setLocalError('Password is required.'); return; }
    if (form.password !== form.confirm) {
      setLocalError('Passwords do not match.');
      return;
    }

    register({
      username: form.username.trim(),
      email:    form.email.trim(),
      password: form.password,
    });
  }

  return (
    <GlassCard component="form" onSubmit={handleSubmit} noValidate>

      <div>
        <CardTitle variant="h4">Create Account</CardTitle>
        <CardSubtitle variant="body2">Start building your portfolio today</CardSubtitle>
      </div>

      {errorMsg && <FormAlert severity="error">{errorMsg}</FormAlert>}

      <FormInput
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange('username')}
        autoComplete="username"
        startIcon={<PersonOutlineIcon fontSize="small" />}
        required
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
        autoComplete="email"
        startIcon={<EmailOutlinedIcon fontSize="small" />}
        required
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange('password')}
        autoComplete="new-password"
        startIcon={<LockOutlinedIcon fontSize="small" />}
        required
      />

      <FormInput
        label="Confirm Password"
        name="confirm"
        type="password"
        value={form.confirm}
        onChange={handleChange('confirm')}
        autoComplete="new-password"
        startIcon={<LockResetOutlinedIcon fontSize="small" />}
        required
      />

      <SparkleButton type="submit" loading={isPending}>
        Register
      </SparkleButton>

      <FooterText>
        Already have an account?{' '}
        <AuthNavLink to="/login">Login</AuthNavLink>
      </FooterText>

    </GlassCard>
  );
}
