const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ticket", function () {

    async function deployTicket() {
        const Ticket = await ethers.getContractFactory("Ticket");
        [owner, addr1, addr2] = await ethers.getSigners();
        const ticket = await Ticket.deploy();
        return { ticket, owner, addr1, addr2 };
    }

    it("Should issue a ticket to an address", async function () {
        const { ticket, addr1 } = await loadFixture(deployTicket);
        await ticket.issueTicket(addr1.address);
        expect(await ticket.ownerOf(1)).to.equal(addr1.address);
    });

    it("Should allow verifying the ticket ownership", async function () {
        const { ticket, addr1 } = await loadFixture(deployTicket);
        await ticket.issueTicket(addr1.address);
        expect(await ticket.verifyOwnership(addr1.address, 1)).to.equal(true);
    });

    it("Should prevent non-owners from verifying ownership incorrectly", async function () {
        const { ticket, addr1, addr2 } = await loadFixture(deployTicket);
        await ticket.issueTicket(addr1.address);
        expect(await ticket.verifyOwnership(addr2.address, 1)).to.equal(false);
    });
});
