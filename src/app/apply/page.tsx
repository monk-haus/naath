import ApplyForm from './ApplyForm';

// FIX: This line is critical for Cloudflare Pages.
// It forces this route to run as a Worker, allowing it to accept POST requests (Server Actions).
export const runtime = 'edge';

export default function ApplyPage() {
    return <ApplyForm />;
}