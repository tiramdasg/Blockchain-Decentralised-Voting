pragma solidity ^0.5.0;

contract Voting {

    uint public candidateCount;
    bool public startVote;
    bool public endVote;

    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount;
    }
    struct Users{

        uint vote;
        bool voted;
    }

    mapping(uint => Candidate) public candidatesInfo;
    mapping(address => bool) public users;  

    constructor() public {
        candidateCount = 0;
    }
    address admin; 
    modifier Admin() {
    require(msg.sender == admin);
    _;
    }

    event candidateAdded(uint id,string name,string party,uint voteCount);

    function addCandidate(string memory _name,string memory _party) public Admin{
        incrementCount();
        candidatesInfo[candidateCount] = Candidate({id:candidateCount, name: _name,party : _party, voteCount: 0 });
        emit candidateAdded(candidateCount, _name, _party, 0);    
    }

    function incrementCount() internal{
        candidateCount +=1;
    }
    function startVoting() public Admin {
        startVote = true;
    }
    function endVoting() public Admin {
        endVote = false;
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


}