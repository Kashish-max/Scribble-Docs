import Head from "next/head"
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <main>
      <Head>
        <title>Scribble Docs</title>
      </Head>
    </main>
  )
}

