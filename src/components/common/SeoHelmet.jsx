import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoHelmet = ({
  title,
  description = 'LilacTechSys delivers enterprise cloud solutions, custom software engineering, and digital growth platforms.',
  keywords = 'IT solutions, cloud migration, custom software, DevOps, cybersecurity, web development',
  image = '/og-image.png',
  url = 'https://lilactechsys.com',
}) => {
  const fullTitle = title
    ? `${title} | LilacTechSys`
    : 'LilacTechSys | Smart IT Solutions. Seamless Digital Growth.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SeoHelmet;
