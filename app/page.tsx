import { Separator } from '@radix-ui/react-separator';
import './page.scss';
import { Button } from '@/components/ui/button';
import FancyBackground from '@/components/FancyBackground';
import Link from 'next/link';

export default function Home() {

  return (
    <>
      <main className='home-container'>
        <FancyBackground />
        <header>
          <h1>
            Solvro Cocktails
          </h1>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            Bo student nie kaktus...
          </h2>
        </header>
        <article className='content'>
          <section className='btn-box'>
            <Link href="/browse">
              <Button size={'lg'} className={'scale-90 lg:scale-125 sm:scale-100 hover:cursor-pointer'} variant={'secondary'}>Browse Cocktails</Button>
            </Link>
            <a href="">
              <Button size={'lg'} className={' scale-90 lg:scale-125 sm:scale-100 lg:ml-20 hover:cursor-pointer'} variant={'outline'}>Explore Repository</Button>
            </a>
          </section>
        </article>
      </main>


    </>
  );
}
