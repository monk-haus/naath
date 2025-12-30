import Hero from '@/components/Hero';
import EditorsLetter from '@/components/EditorsLetter';
import PrivateViewingRoom from '@/components/PrivateViewingRoom';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    // FIX: Added max-w-[100vw] and explicit overflow-x-hidden
    <main className="min-h-screen bg-alabaster selection:bg-clay selection:text-alabaster w-full max-w-[100vw] overflow-x-hidden relative">
      <Hero />
      <EditorsLetter />
      <PrivateViewingRoom />
      <Footer />
    </main>
  );
}