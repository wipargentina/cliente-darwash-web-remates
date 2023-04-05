import Link from 'next/link';

export default function Remates() {
  return (
    <>
      <div className="container">
        <h1>Remates</h1>
        <Link href="/remates/remate-1" passHref>
          <a>Remate 1</a>
        </Link>
      </div>
    </>
  );
}
