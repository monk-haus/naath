import Hero from '@/components/Hero';
import EditorsLetter from '@/components/EditorsLetter';
import PrivateViewingRoom from '@/components/PrivateViewingRoom';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-alabaster selection:bg-clay selection:text-alabaster w-full overflow-hidden">
      <Hero />
      <EditorsLetter />
      <PrivateViewingRoom />
      <Footer />
    </main>
  );
}