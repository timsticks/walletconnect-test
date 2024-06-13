document.addEventListener("DOMContentLoaded", async function () {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletStatus = document.getElementById('walletStatus');

    let walletConnector;

    connectWalletBtn.addEventListener('click', async () => {
        if (!walletConnector) {
            walletConnector = new WalletConnect.Client.default({
                bridge: 'https://bridge.walletconnect.org'
            });

            if (!walletConnector.connected) {
                await walletConnector.createSession();
            }

            walletConnector.on('connect', (error, payload) => {
                if (error) {
                    throw error;
                }
                const { accounts } = payload.params[0];
                const walletAddress = accounts[0];
                walletStatus.innerText = `Connected: ${walletAddress}`;
                connectWalletBtn.innerText = `Connected: ${walletAddress}`;
            });

            walletConnector.on('disconnect', (error, payload) => {
                if (error) {
                    throw error;
                }
                walletConnector = null;
                walletStatus.innerText = '';
                connectWalletBtn.innerText = 'Connect Wallet';
            });

            walletConnector.on('session_update', (error, payload) => {
                if (error) {
                    throw error;
                }
                const { accounts } = payload.params[0];
                const walletAddress = accounts[0];
                walletStatus.innerText = `Connected: ${walletAddress}`;
                connectWalletBtn.innerText = `Connected: ${walletAddress}`;
            });
        } else {
            walletConnector.killSession();
        }
    });
});
