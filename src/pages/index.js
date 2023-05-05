import Head from "next/head";
import Weather from "../components/Weather";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wetter-App</title>
        <meta
          name="description"
          content="Eine Wetter-App erstellt mit Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Weather />
      </main>
    </div>
  );
}
