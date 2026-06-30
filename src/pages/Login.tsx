import LoginForm from '../components/unique/LoginForm';
import { PageBackground, PageContent } from './Login.styles';

// ─── Login Page ───────────────────────────────────────────────────────────────
// Full-viewport background image with the glassmorphism LoginForm centered.
// No nav bar on auth pages.

export default function Login() {
  return (
    <PageBackground>
      <PageContent>
        <LoginForm />
      </PageContent>
    </PageBackground>
  );
}
