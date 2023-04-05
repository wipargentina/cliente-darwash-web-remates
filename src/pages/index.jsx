import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Welcome Darwash Web!!!</h1>
        <Link href="/remates/remate-1" passHref>
          <a>Remate 1</a>
        </Link>
      </div>
    </>
  );
}
