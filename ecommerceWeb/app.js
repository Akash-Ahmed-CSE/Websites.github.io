/**
 * Fetches application data from data.json on page load.
 * The 'no-store' cache policy ensures the browser always retrieves the latest version.
 */

let appData = null; // Global state to hold your data
let _resolvedToken = ''; // Decrypted token held in memory

// Secret key used for decryption (matches the one in index.html)
const _SK = ['ShopNest', '_XK92!m', 'Z#v8@pQ'].join('');

/**
 * Decrypts the hex-encoded token using XOR cipher
 */
function _xorCipher(hex, key) {
    let out = '';
    for (let i = 0; i < hex.length; i += 2) {
        const byte = parseInt(hex.slice(i, i + 2), 16) ^ key.charCodeAt((i / 2) % key.length);
        out += String.fromCharCode(byte);
    }
    return out;
}

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
        appData = data;

        // Handle Token Decryption if config exists in data.json
        if (data.githubConfig && data.githubConfig.encryptedToken) {
            try {
                _resolvedToken = _xorCipher(data.githubConfig.encryptedToken, _SK);
                console.log("GitHub Sync Token initialized.");
            } catch (e) {
                console.error("Token decryption failed:", e);
            }
        }

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
async function updateOrderStatus(orderId, newStatus) {
    if (!appData || !appData.orders) {
        console.error("Data has not been loaded yet.");
        return;
    }

    // Security check: Only admins can trigger a status update. 
    // currentUser is managed in index.html
    if (typeof window.currentUser === 'undefined' || !window.currentUser?.isAdmin) {
        console.error("Unauthorized: Only admins can update order status.");
        return;
    }

    const order = appData.orders.find(o => o.id === orderId);

    if (order) {
        const oldStatus = order.status;
        order.status = newStatus;
        
        try {
            // 1. Instantly update the local UI for the admin
            console.log(`Updating UI locally: ${orderId} is now ${newStatus}`);
            // renderOrders(); // Trigger your UI refresh function here

            // 2. Persist the change to GitHub so all users see it
            await saveDataToGitHub();
            
            console.log(`Successfully synced Order ${orderId} to GitHub.`);
        } catch (error) {
            // Rollback local state if the server update fails
            order.status = oldStatus;
            console.error("Failed to sync status update:", error);
            alert("Failed to update status on the server. Please check your connection.");
        }
    } else {
        console.warn(`Order ${orderId} not found.`);
    }
}

/**
 * Pushes the current appData state to the data.json file in the GitHub repository.
 */
async function saveDataToGitHub() {
    const config = {
        user: appData.githubConfig?.user || 'Akash-Ahmed-CSE',
        repo: appData.githubConfig?.repo || 'Websites.github.io',
        path: 'ecommerceWeb/data.json'
    };

    const API_URL = `https://api.github.com/repos/${config.user}/${config.repo}/contents/${config.path}`;

    // 1. Get the current file SHA (required by GitHub for updates)
    const getRes = await fetch(API_URL, {
        headers: { Authorization: `token ${_resolvedToken}` }
    });
    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Prepare the new content
    const utf8Bytes = new TextEncoder().encode(JSON.stringify(appData, null, 2));
    const updatedContent = btoa(String.fromCharCode(...utf8Bytes));

    // 3. Update the file via PUT request
    const putRes = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            Authorization: `token ${_resolvedToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: `Admin update: Order status changed`,
            content: updatedContent,
            sha: sha
        })
    });

    if (!putRes.ok) throw new Error("GitHub API Update Failed");
}

// Start the fetch process as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);