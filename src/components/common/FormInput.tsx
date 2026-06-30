import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';

// ─── Props ───────────────────────────────────────────────────────────────────
// Thin wrapper around MUI TextField.
// All MUI TextField props pass through — we only add `startIcon` / `endIcon`
// as a convenience so callers don't need to build InputAdornment themselves.

interface FormInputProps extends Omit<TextFieldProps, 'variant'> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function FormInput({ startIcon, endIcon, ...rest }: FormInputProps) {
  return (
    <TextField
      {...rest}
      InputProps={{
        startAdornment: startIcon
          ? <InputAdornment position="start">{startIcon}</InputAdornment>
          : undefined,
        endAdornment: endIcon
          ? <InputAdornment position="end">{endIcon}</InputAdornment>
          : undefined,
        ...rest.InputProps,
      }}
    />
  );
}
