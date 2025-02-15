require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");

const app = express();
const port = 3000;

app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = [
    "function issueTicket(address to) public",
    "function verifyOwnership(address owner, uint256 tokenId) public view returns (bool)"
];

const ticketNFT = new ethers.Contract(contractAddress, contractABI, wallet);

app.post("/issue-ticket", async (req, res) => {
    try {
        const { recipient } = req.body;
        if (!recipient) return res.status(400).json({ error: "Address is required" });

        const tx = await ticketNFT.issueTicket(recipient);
        await tx.wait();

        res.json({ message: "NFT issued successfully!", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/verify-ownership", async (req, res) => {
    try {
        const { owner, tokenId } = req.query;
        if (!owner || !tokenId) return res.status(400).json({ error: "Parameters 'owner' and 'tokenId' are required" });

        const isOwner = await ticketNFT.verifyOwnership(owner, tokenId);
        res.json({ owner, tokenId, isOwner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
