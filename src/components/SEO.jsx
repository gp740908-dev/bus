import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = 'PO. Cipeng',
    description = 'PO. Cipeng - Layanan bus nyaman, aman, dan tepat waktu. Pesan tiket online untuk perjalanan antar kota di Jawa.',
    keywords = 'bus, tiket bus, PO Cipeng, bus Jakarta, bus Surabaya, bus Bandung, tiket online',
    image = '/og-image.jpg',
    url,
}) => {
    const siteTitle = title === 'PO. Cipeng' ? title : `${title} | PO. Cipeng`;

    return (
        <Helmet>
            {/* Basic */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {url && <meta property="og:url" content={url} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Additional */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="Indonesian" />
            <meta name="author" content="PO. Cipeng" />
        </Helmet>
    );
};

export default SEO;
