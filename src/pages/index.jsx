import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Filter from '../components/Filter';
import meta from '../statics/meta';

export default function Home({ videos }) {
  return (
    <>
      <Head>
        <title>{meta.pageTitle}</title>
        <meta name="title" content={meta.pageTitle} />
        <meta name="description" content={meta.pageDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@voicetube" />
        <meta property="fb:app_id" content="405950462809241" />
        <meta property="og:title" content={meta.metaTitle} />
        <meta property="og:description" content={meta.metaDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://vt-cdn.voicetube.com/assets/img/meta/default-image.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:locale" content="zh_TW" />
        <meta property="og:site_name" content="VoiceTube" />
        <meta name="author" content="VoiceTube" />
        <meta property="fb:pages" content="515316421821497" />
      </Head>
      <div className={styles.wrapper}>
        <Filter videos={videos} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    'https://us-central1-lithe-window-713.cloudfunctions.net/frontendQuiz'
  );
  const videos = await res.json();

  return {
    props: {
      videos,
    },
  };
};
