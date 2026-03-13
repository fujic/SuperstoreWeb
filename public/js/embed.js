console.log("!!! EMBED.JS IS LOADING !!!");
alert("Script running! Check the console now.");

async function initTableau() {
    const viz = document.getElementById('tableauViz');
    if (!viz) {
        console.error("CRITICAL: <tableau-viz> element not found!");
        return;
    }   

    try {
        console.log("Fetching token...");
        const response = await fetch('/get-tableau-token');
        const data = await response.json();

        if (data.token) {
            viz.token = data.token;
            console.log("Success: JWT injected.");
        }
    } catch (err) {
        console.error("Fetch failed:", err);
    }
    viz.addEventListener('firstinteractive', () => {
    console.log("menu modified.");
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();

            // 1. Update UI: Move the 'active' class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // 2. Update Tableau: Switch the sheet
            const workbook = viz.workbook;
            const sheetName = link.textContent; // Ensure this matches the Tableau Tab name exactly!
            
            try {
                await workbook.activateSheetAsync(sheetName);
                console.log(`Switched to ${sheetName}`);
            } catch (error) {
                console.error("Sheet swap failed. Check if the tab name matches exactly in Tableau.", error);
            }
        });
    });
}); 
}

// Run immediately since it's a module
initTableau();

