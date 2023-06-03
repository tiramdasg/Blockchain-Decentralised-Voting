pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Voting {

    uint public candidateCount;
    bool public startVote;
    bool public endVote;
    address public admin; 
    struct Candidate {
        uint id;
        string name;
        string party;
        string info;
        uint voteCount;
    }
    struct Users{

        uint vote;
        bool voted;
    }
    Candidate[] public candidates;
    mapping(uint => Candidate) public candidatesInfo;
    mapping(address => bool) public users;  

    constructor() public {
        candidateCount = 0;
        admin = msg.sender;
    }
    function getAdmin() public view returns (address) {
        // Returns account address used to deploy contract (i.e. admin)
        return admin;
    }
    modifier Admin() {
    require(msg.sender == admin);
    _;
    }

    event candidateAdded(uint id,string name,string party,string info,uint voteCount);

    function addCandidate(string memory _name,string memory _party,string memory _info) public Admin{
        incrementCount();
        candidatesInfo[candidateCount] = Candidate({id:candidateCount, name: _name,party : _party,info : _info, voteCount: 0 });
        emit candidateAdded(candidateCount, _name, _party,_info, 0);    
        candidates.push(Candidate(candidateCount,_name, _party,_info,0));
    }

    
    function getCandidates() public view returns (string[] memory, string[] memory,string[] memory) {
        string[] memory candidateNames = new string[](candidates.length);
        string[] memory candidateParties = new string[](candidates.length);
        string[] memory candidatemessage = new string[](candidates.length);
        
        for (uint i = 0; i < candidates.length; i++) {
            candidateNames[i] = candidates[i].name;
            candidateParties[i] = candidates[i].party;
            candidatemessage[i] = candidates[i].info;
        }
        
        return (candidateNames, candidateParties,candidatemessage);
    }
    function incrementCount() internal{
        candidateCount +=1;
    }
    function startVoting() public Admin {
        startVote = true;
        endVote = false;
    }
    function endVoting() public  Admin{
        endVote = true;
        startVote = false;
    }

    function hasVotingStarted() public view returns (bool) {
    return startVote;
    }

    event userVoted(uint candidateId);

    function vote(uint candidateId) public {
        require(users[msg.sender] == false);
        require(candidateId > 0 && candidateId <= candidateCount);
        require(startVote == true);
        require(endVote == false);
        users[msg.sender] = true;
        candidatesInfo[candidateId].voteCount ++;
        emit userVoted(candidateId);
    }
function getVoteCounts() public view returns (uint[] memory) {
    uint[] memory voteCounts = new uint[](candidateCount);
    
    for (uint i = 1; i <= candidateCount; i++) {
        voteCounts[i-1] = candidatesInfo[i].voteCount;
    }
    
    return voteCounts;
}


}
