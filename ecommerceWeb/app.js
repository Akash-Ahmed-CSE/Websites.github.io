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

        appData = await response.json();

        // Bridge to index.html global state
        window.products = appData.products || [];
        window.orders = appData.orders || [];
        window.usersDB = appData.users || [];
        window.globalDeliveryCharge = appData.globalDeliveryCharge || 60;
        window.githubConfig = appData.githubConfig;

        // Handle Token Decryption if config exists in data.json
        if (appData.githubConfig && appData.githubConfig.encryptedToken) {
            try {
                _resolvedToken = _xorCipher(appData.githubConfig.encryptedToken, _SK);
                console.log("GitHub Sync Token initialized.");
            } catch (e) {
                console.error("Token decryption failed:", e);
            }
        }

        // Trigger UI Rendering (defined in index.html)
        if (window.renderProducts) window.renderProducts();
        if (window.restoreSession) window.restoreSession();

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
    // Only admins can trigger a status update.
    if (!window.currentUser?.isAdmin) {
        if (window.showToast) window.showToast("Unauthorized: Admin access required", "error");
        return;
    }

    const order = appData.orders.find(o => o.id === orderId);

    if (order) {
        const oldStatus = order.status;
        order.status = newStatus;
        
        try {
            // 1. Instantly update local UI
            if (window.renderAdminOrders) window.renderAdminOrders();
            if (window.showToast) window.showToast(`Order ${orderId} is now ${newStatus}`, "success");
            
            // 2. Persist the change to GitHub so all users see it
            await saveData(); 
            
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
 * Centralized save function to update localStorage and GitHub
 */
async function saveData() {
    // Prepare payload using current global state
    const data = { 
        products: window.products, 
        users: window.usersDB, 
        orders: window.orders, 
        globalDeliveryCharge: window.globalDeliveryCharge,
        githubConfig: window.githubConfig 
    };
    
    localStorage.setItem('shopnest_storage', JSON.stringify(data));
    await saveDataToGitHub(data);
}

/**
 * Pushes the current appData state to the data.json file in the GitHub repository.
 */
async function saveDataToGitHub(dataToSave) {
    const config = {
        user: window.githubConfig?.user || 'Akash-Ahmed-CSE',
        repo: window.githubConfig?.repo || 'Websites.github.io',
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
    const utf8Bytes = new TextEncoder().encode(JSON.stringify(dataToSave, null, 2));
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