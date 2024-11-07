import React, { useState } from 'react';
import { ethers } from 'ethers';
import TrustifyABI from './TrustifyABI.json'; // Paste ABI JSON here

const trustifyAddress = 'YOUR_CONTRACT_ADDRESS_HERE';

function App() {
    const [account, setAccount] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [freelancer, setFreelancer] = useState('');

    // Connect to MetaMask
    const connectWallet = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
        } else {
            alert('MetaMask is required to use this feature.');
        }
    };

    // Add Review
    const addReview = async () => {
        if (!account) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(trustifyAddress, TrustifyABI, signer);

        try {
            await contract.addReview(freelancer, review, rating);
            alert('Review added successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add review.');
        }
    };

    return (
        <div className="App">
            <h1>Trustify</h1>
            {!account ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <p>Connected as: {account}</p>
            )}

            <div>
                <h2>Submit a Review</h2>
                <input type="text" placeholder="Freelancer Address" onChange={(e) => setFreelancer(e.target.value)} />
                <textarea placeholder="Review" onChange={(e) => setReview(e.target.value)}></textarea>
                <input type="number" min="1" max="5" placeholder="Rating (1-5)" onChange={(e) => setRating(Number(e.target.value))} />
                <button onClick={addReview}>Submit Review</button>
            </div>
        </div>
    );
}

export default App;
