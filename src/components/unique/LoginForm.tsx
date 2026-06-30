import { useState } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import FormInput from '../common/FormInput';
import SparkleButton from '../common/SparkleButton';
import { useLogin } from '../../hooks/useAuth';
import {
  GlassCard,
  CardTitle,
  CardSubtitle,
  FormAlert,
  FooterText,
  AuthNavLink,
} from './LoginForm.styles';

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormState {
  email: string;
  password: string;
}

const EMPTY_FORM: FormState = { email: '', password: '' };

export default function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [localError, setLocalError] = useState('');

  const errorMsg = localError || (error instanceof Error ? error.message : '');

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      if (localError) setLocalError('');
    };
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.email.trim()) { setLocalError('Email is required.');    return; }
    if (!form.password)     { setLocalError('Password is required.'); return; }
    login({ email: form.email.trim(), password: form.password });
  }

  return (
    <GlassCard component="form" onSubmit={handleSubmit} noValidate>
      <div>
        <CardTitle variant="h4">Welcome Back</CardTitle>
        <CardSubtitle variant="body2">Sign in to your SkillTrack account</CardSubtitle>
      </div>

      {errorMsg && <FormAlert severity="error">{errorMsg}</FormAlert>}

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
        autoComplete="current-password"
        startIcon={<LockOutlinedIcon fontSize="small" />}
        required
      />

      <SparkleButton type="submit" loading={isPending}>
        Login
      </SparkleButton>

      <FooterText>
        Don't have an account?{' '}
        <AuthNavLink to="/register">Register</AuthNavLink>
      </FooterText>
    </GlassCard>
  );
}
