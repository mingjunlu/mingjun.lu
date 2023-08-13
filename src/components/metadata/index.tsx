import Head from 'next/head';
import { site } from 'src/constants';

type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export default function Metadata(props: MetadataProps) {
  const { title, description, image, url } = props;

  return (
    <Head>
      {!!title && (
        <>
          <title>{`${title} | ${site.name}`}</title>
          <meta
            property="og:title"
            content={`${title} | ${site.name}`}
          />
          <meta
            name="twitter:title"
            content={`${title} | ${site.name}`}
          />
        </>
      )}
      {!!description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {!!image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      )}
      {!!url && <meta property="og:url" content={url} />}
    </Head>
  );
}
