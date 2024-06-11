document.addEventListener("DOMContentLoaded", function () {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletAddressDisplay = document.getElementById('walletAddressDisplay');

    connectWalletBtn.addEventListener('click', async () => {
        try {
            if (typeof window.hashpack === 'undefined') {
                alert('Please install the HashPack wallet extension.');
                return;
            }

            window.hashpack.on('pairing', async (pairingData) => {
                const walletAddress = pairingData.accountIds[0];
                connectWalletBtn.innerText = `Connected: ${walletAddress}`;
                walletAddressDisplay.innerText = `Wallet Address: ${walletAddress}`;
            });

            window.hashpack.send('pair');
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    });
});
