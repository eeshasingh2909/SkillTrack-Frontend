import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormInput from './FormInput';
import type { TextFieldProps } from '@mui/material/TextField';

// ─── Props ───────────────────────────────────────────────────────────────────
// Wraps FormInput with a built-in show/hide password toggle.
// Callers just use <PasswordInput> instead of <FormInput type="password">.
// The eye icon lives here — not repeated in every form.

type PasswordInputProps = Omit<TextFieldProps, 'variant' | 'type'>;

// ─── Styled icon button ───────────────────────────────────────────────────────
// Keeps the toggle button style consistent and out of the component body

export default function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <FormInput
      {...props}
      type={show ? 'text' : 'password'}
      startIcon={<LockOutlinedIcon fontSize="small" />}
      endIcon={
        <IconButton
          onClick={() => setShow(prev => !prev)}
          edge="end"
          size="small"
          aria-label={show ? 'Hide password' : 'Show password'}
          tabIndex={-1}          // don't break tab flow through form fields
          sx={{ color: 'text.disabled', '&:hover': { color: 'primary.light' } }}
        >
          {show
            ? <VisibilityOffOutlinedIcon fontSize="small" />
            : <VisibilityOutlinedIcon fontSize="small" />}
        </IconButton>
      }
    />
  );
}
