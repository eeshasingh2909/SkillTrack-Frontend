import RegisterForm from '../components/unique/RegisterForm';
import { PageBackground, PageContent } from './Register.styles';

// ─── Register Page ───────────────────────────────────────────────────────────
// Full-viewport background image with the glassmorphism RegisterForm centered.
// No nav bar on auth pages.

export default function Register() {
  return (
    <PageBackground>
      <PageContent>
        <RegisterForm />
      </PageContent>
    </PageBackground>
  );
}
