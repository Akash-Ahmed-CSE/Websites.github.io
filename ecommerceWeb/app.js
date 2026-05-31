/**
 * Fetches application data from data.json on page load.
 * The 'no-store' cache policy ensures the browser always retrieves the latest version.
 */

let appData = null; // Global state to hold your data

async function initializeApp() {
    const DATA_SOURCE = 'data.json';

    try {
        const response = await fetch(DATA_SOURCE, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Failed to load ${DATA_SOURCE}: ${response.statusText}`);
        }

        appData = await response.json();

        // Data is now ready to be used by the application
        console.log("Application data loaded:", appData);

        // Example: Filter and log popular products from the fetched data
        const popularProducts = appData.products.filter(p => p.isPopular);
        console.log("Featured items:", popularProducts);

    } catch (error) {
        console.error("Initialization failed:", error);
    }
}

/**
 * Updates the status of an order in the local application state.
 * @param {string} orderId - The ID of the order (e.g., "ORD-471888")
 * @param {string} newStatus - The new status value (e.g., "shipped", "pending")
 */
function updateOrderStatus(orderId, newStatus) {
    if (!appData || !appData.orders) {
        console.error("Data has not been loaded yet.");
        return;
    }

    const order = appData.orders.find(o => o.id === orderId);

    if (order) {
        order.status = newStatus;
        console.log(`Successfully updated Order ${orderId} status to: ${newStatus}`);
        
        // Note: This only updates the data in your browser's memory.
        // To save this permanently back to data.json, you would typically 
        // send a POST/PUT request to a backend server or use the GitHub API.
        
        // After updating the data, you would typically call a function 
        // here to re-render your "All Orders" table.
    } else {
        console.warn(`Order ${orderId} not found.`);
    }
}

// Start the fetch process as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);