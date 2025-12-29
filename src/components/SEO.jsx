import { useEffect } from 'react';

const SEO = ({
    title = 'PO. Cipeng',
    description = 'PO. Cipeng - Layanan bus nyaman, aman, dan tepat waktu. Pesan tiket online untuk perjalanan antar kota di Jawa.',
}) => {
    const siteTitle = title === 'PO. Cipeng' ? title : `${title} | PO. Cipeng`;

    useEffect(() => {
        // Update document title
        document.title = siteTitle;

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = description;

        // Cleanup
        return () => {
            document.title = 'PO. Cipeng';
        };
    }, [siteTitle, description]);

    return null;
};

export default SEO;
