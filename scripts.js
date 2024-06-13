document.addEventListener("DOMContentLoaded", async function () {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const PROJECT_ID = "d5459ebd6db9c584de814bae80e36e48"; // Replace with your WalletConnect project ID
    const appMetadata = {
        name: "HashPack Wallet Connect Test",
        description: "Test connecting HashPack wallet",
        icons: ["https://example.com/icon.png"],
        url: "https://example.com"
    };

    let hashconnect = new HashConnect();
    let pairingData = null;

    // Initialize HashConnect
    async function init() {
        hashconnect = new HashConnect();

        // Register events
        setUpHashConnectEvents();

        // Initialize and open pairing modal
        let initData = await hashconnect.init(appMetadata);
        await hashconnect.connect();

        if (initData.savedPairings.length > 0) {
            pairingData = initData.savedPairings[0];
            updateWalletDisplay();
        } else {
            hashconnect.openPairingModal();
        }
    }

    function setUpHashConnectEvents() {
        hashconnect.pairingEvent.on((newPairing) => {
            pairingData = newPairing;
            updateWalletDisplay();
        });

        hashconnect.disconnectionEvent.on(() => {
            pairingData = null;
            updateWalletDisplay();
        });

        hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
            console.log("Connection status:", connectionStatus);
        });
    }

    function updateWalletDisplay() {
        if (pairingData) {
            connectWalletBtn.innerText = `Connected: ${pairingData.accountIds[0]}`;
        } else {
            connectWalletBtn.innerText = "Connect Wallet";
        }
    }

    connectWalletBtn.addEventListener('click', init);

    // Automatically try to connect on page load
    init();
});
