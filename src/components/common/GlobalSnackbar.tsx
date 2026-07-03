import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useToastStore } from '../../store/toastStore';

// ─── GlobalSnackbar ───────────────────────────────────────────────────────────
// Mount once in main.tsx (inside ThemeProvider).
// Call useToastStore's showToast() from anywhere — no prop drilling needed.

export default function GlobalSnackbar() {
  const { toasts, removeToast } = useToastStore();

  return (
    <>
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          // Stack multiple toasts vertically
          sx={{ bottom: { xs: 24 + index * 72, sm: 24 + index * 72 } }}
          onClose={() => removeToast(toast.id)}
        >
          <Alert
            severity={toast.severity}
            variant="filled"
            onClose={() => removeToast(toast.id)}
            sx={{
              minWidth: 300,
              borderRadius: 2,
              fontWeight: 500,
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
