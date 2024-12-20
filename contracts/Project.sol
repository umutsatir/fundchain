//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

contract Project {
    address owner;
    mapping(address => uint) fundedAmount;
    uint goal;
    uint totalBalance = 0;
    uint deadline;
    uint feePercentage = 5;
    uint startingTime;
    address fundchainAccount;

    event AmountRaised(address indexed _fundingAccount, uint indexed amount);
    event FundWithdrawn(address indexed _fundingAccount, uint amount);
    event DonationWithdrawn(address indexed _fundingAccount, uint amount);

    constructor(uint newDeadline, uint newGoal) {
        require(
            newDeadline > block.timestamp,
            "The deadline must be in the future"
        );
        owner = msg.sender;
        startingTime = block.timestamp;
        deadline = startingTime + (newDeadline * 1 days);
        goal = newGoal;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier checkDeadline() {
        require(block.timestamp < deadline, "Deadline has passed");
        _;
    }

    function getFundedAmount() public view returns (uint) {
        return fundedAmount[msg.sender];
    }

    function getFee() public view returns (uint) {
        return feePercentage;
    }

    function getDeadline() public view returns (uint) {
        return (deadline - startingTime) / 1 days; // convert seconds into days
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getTotalBalance() public view returns (uint) {
        return totalBalance;
    }

    function getGoal() public view returns (uint) {
        return goal;
    }

    function fundProject() public payable checkDeadline {
        require(block.timestamp < deadline, "Deadline has passed");
        require(msg.sender != owner, "Cannot fund your own project");
        require(msg.value > 0, "You must fund your donation");
        fundedAmount[msg.sender] += msg.value;
        totalBalance += msg.value;
    }

    function withdraw() public onlyOwner {
        require(block.timestamp >= deadline, "Deadline has not passed");
        require(getTotalBalance() >= goal, "Project is not met");
        uint feeAmount = (getTotalBalance() / 100) * feePercentage;
        (bool success, ) = payable(fundchainAccount).call{value: feeAmount}("");
        require(success, "Transfer failed");
        (bool success2, ) = payable(owner).call{
            value: getTotalBalance() - feeAmount
        }("");
        require(success2, "Transfer failed");
        emit FundWithdrawn(msg.sender, totalBalance);
    }

    function withdrawDonate() public {
        require(fundedAmount[msg.sender] > 0, "You donated nothing");
        (bool success, ) = payable(owner).call{value: fundedAmount[msg.sender]}(
            ""
        );
        require(success, "Transfer failed");
        emit DonationWithdrawn(msg.sender, fundedAmount[msg.sender]);
        fundedAmount[msg.sender] = 0;
    }
}