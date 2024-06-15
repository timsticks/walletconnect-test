document.addEventListener("DOMContentLoaded", async function () {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const connectionStatus = document.getElementById('connectionStatus');
    const pairingDetails = document.getElementById('pairingDetails');

    let hashconnect = new HashConnect(true);
    let appMetadata = {
        name: "Launchpad",
        description: "A simple Hedera wallet connector",
        icon: "https://example.com/icon.png"
    };

    let initData = await hashconnect.init(appMetadata, "testnet", false);
    let savedPairings = hashconnect.loadPairingData();

    hashconnect.pairingEvent.on(pairingData => {
        connectionStatus.innerText = "Connected";
        pairingDetails.innerHTML = `
            <p>Account ID: ${pairingData.accountIds[0]}</p>
            <p>Network: ${pairingData.network}</p>
            <p>Metadata: ${JSON.stringify(pairingData.metadata)}</p>
        `;
    });

    hashconnect.connectionStatusChangeEvent.on(newStatus => {
        connectionStatus.innerText = `Connection status: ${newStatus}`;
    });

    hashconnect.disconnectionEvent.on(() => {
        connectionStatus.innerText = "Disconnected";
        pairingDetails.innerHTML = "";
    });

    connectWalletBtn.addEventListener('click', () => {
        hashconnect.connectToLocalWallet();
        hashconnect.openPairing();
    });
});
