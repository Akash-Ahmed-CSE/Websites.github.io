/**
 * Fetches application data from data.json on page load.
 * The 'no-store' cache policy ensures the browser always retrieves the latest version.
 */
async function initializeApp() {
    const DATA_SOURCE = 'data.json';

    try {
        const response = await fetch(DATA_SOURCE, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Failed to load ${DATA_SOURCE}: ${response.statusText}`);
        }

        const data = await response.json();

        // Data is now ready to be used by the application
        console.log("Application data loaded:", data);

        // Example: Filter and log popular products from the fetched data
        const popularProducts = data.products.filter(p => p.isPopular);
        console.log("Featured items:", popularProducts);

    } catch (error) {
        console.error("Initialization failed:", error);
    }
}

// Start the fetch process as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);