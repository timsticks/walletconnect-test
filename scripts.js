document.addEventListener("DOMContentLoaded", async function () {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletAddressDisplay = document.getElementById('walletAddressDisplay');

    let walletAddress = "";

    connectWalletBtn.addEventListener('click', async () => {
        try {
            const hashconnect = new HashConnect();
            const appData = {
                name: "Wallet Connect Test",
                description: "Testing wallet connection",
                icon: "https://example.com/icon.png"
            };

            await hashconnect.init(appData, "testnet", false);
            const state = await hashconnect.connect();
            const pairings = hashconnect.getPairings();

            if (pairings.length > 0) {
                walletAddress = pairings[0].accountIds[0];
                connectWalletBtn.innerText = `Connected: ${walletAddress}`;
                walletAddressDisplay.innerText = `Wallet Address: ${walletAddress}`;
            }
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    });
});
