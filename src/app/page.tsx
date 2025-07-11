import Header from '@/components/header';
import Hero from '@/components/sections/hero';
import Culture from '@/components/sections/culture';
import Gallery from '@/components/sections/gallery';
import VideoStories from '@/components/sections/video-stories';
import ExploreVillages from '@/components/sections/explore-villages';
import ArtsCrafts from '@/components/sections/arts-crafts';
import Folklore from '@/components/sections/folklore';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-900 dark:to-green-950">
        <Hero />
        <Culture />
        <Gallery />
        <VideoStories />
        <ExploreVillages />
        <ArtsCrafts />
        <Folklore />
      </main>
      <Footer />
    </div>
  );
}
