export default function gumletLoader({ src, width, quality }) {
    // Skip transformation for Next.js internal images (both _next/image and _next/static)
    if (src.includes('/_next/image') || src.includes('/_next/static')) {
        return src; // Return the original src without any changes
    }

    // Define your base URL in case the src is relative
    const baseUrl = 'https://api.laibo.co.ke';

    // Check if the src is an absolute URL; if not, prepend the base URL
    let fullSrc = src.startsWith('http') ? src : `${baseUrl}${src}`;

    try {
        let parsedUrl = new URL(fullSrc);

        // Check if the hostname includes your original domain
        if (parsedUrl.hostname.includes("api.laibo.co.ke")) {
            parsedUrl.hostname = "laibo.gumlet.io"; // Replace the hostname

            // Remove the port if it exists
            parsedUrl.port = ''; // Sets the port to an empty string
        }

        // Add query parameters for width and quality
        parsedUrl.searchParams.set("w", width);
        parsedUrl.searchParams.set("q", quality || 80);
        return parsedUrl.toString();
    } catch (error) {
        console.error('Error constructing URL:', error);
        return src; // Return the original src as fallback
    }
}
