// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MoroccanElections {
    address public admin;
    
    enum districtType { local , regional}
    enum Gender { male , female}

    struct Voter {
        uint age;
        string cin;
        string region;
        string localdistrict;
        bool hasVotedLocal;
        bool hasVotedRegional;
    }

    struct Candidate {
        string fullname;
        uint age;
        Gender gender;
        string party;
        uint VoteCount;
        uint seatsWon;
    }


    struct District{
        districtType dsType;
        string name;
        uint seatsToWin;
		uint numberOfVoters;
        mapping(string => Candidate) candidates;
		Candidate[] candidatesTable;
        mapping(address => Voter) voters;
		

    }

    mapping(string => District) public localDistricts;
    mapping(string => District) public regionalDistricts;


    bool public electionStarted = false;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function startElection() public onlyAdmin {
        require(!electionStarted, "Election already started.");
        electionStarted = true;
    }

    function endElection() public onlyAdmin {
        require(electionStarted, "Election not started.");
        electionStarted = false;
        // Logic to calculate seats won will be executed here.
    }

function createDistrict(districtType dsType, string memory districtName, uint seatsToWin) public onlyAdmin {
    require(dsType == districtType.local || dsType == districtType.regional, "District type should be local or regional");
    
    if(dsType == districtType.local)
        {localDistricts[districtName].dsType = dsType;
        localDistricts[districtName].name = districtName;
        localDistricts[districtName].seatsToWin = seatsToWin;
		localDistricts[districtName].numberOfVoters = 0;
		}
    else
       {regionalDistricts[districtName].dsType = dsType;
        regionalDistricts[districtName].name = districtName;
        regionalDistricts[districtName].seatsToWin = seatsToWin;
		regionalDistricts[districtName].numberOfVoters = 0;
		}
}


      function addCandidate(string memory fullName,uint age, Gender gender,string memory party,districtType dsType, string memory districtName) public onlyAdmin {
        require(dsType == districtType.local || dsType == districtType.regional, "District type should be local or regional");

        if(dsType == districtType.local)
            {
				localDistricts[districtName].candidates[fullName] = Candidate(fullName, age, gender, party, 0, 0);
			localDistricts[districtName].candidatesTable.push(Candidate(fullName, age, gender, party, 0, 0));
			}
        else if(dsType == districtType.regional)
            {
				require( age > 18 && age < 40 || gender == Gender.female,""); 
            regionalDistricts[districtName].candidates[fullName] = Candidate(fullName, age, gender, party, 0, 0);
    		regionalDistricts[districtName].candidatesTable.push(Candidate(fullName, age, gender, party, 0, 0));
			}
			}

    

    uint numberOfVoters = 0;

    function addVoter(
    uint _age,
    string memory _cin,
    string memory _region,
    string memory _localDistrict
) public {
    require(_age > 18, "Age must be greater than eighteen");

        localDistricts[_localDistrict].voters[msg.sender] = Voter(_age, _cin, _region, _localDistrict, false, false);
		localDistricts[_localDistrict].numberOfVoters++;

        regionalDistricts[_region].voters[msg.sender] = Voter(_age, _cin, _region, _localDistrict, false, false);
		regionalDistricts[_localDistrict].numberOfVoters++;
    
}



function voteLocal(string memory candidateFullName, districtType dsType, string memory localDistrictName) public {
    require(dsType == districtType.local, "Invalid district type");
    require(localDistricts[localDistrictName].voters[msg.sender].hasVotedLocal == false, "You have already voted in this local district");

        localDistricts[localDistrictName].candidates[candidateFullName].VoteCount++;
        localDistricts[localDistrictName].voters[msg.sender].hasVotedLocal = true;

}

function voteRegional(string memory candidateFullName, districtType dsType, string memory regionName) public {
    require(dsType == districtType.regional, "Invalid district type");
    require(regionalDistricts[regionName].voters[msg.sender].hasVotedRegional == false, "You have already voted in this regional district");

        regionalDistricts[regionName].candidates[candidateFullName].VoteCount++;
        regionalDistricts[regionName].voters[msg.sender].hasVotedRegional = true;

}





		
}

    
// localDistricts[localDistrictName].candidates[fullName].seatsWon;






//     function winnerCandidate(districtType dsType, string memory districtName) public view onlyAdmin returns (uint, string memory) {
//     require(dsType == districtType.local || dsType == districtType.regional, "Invalid district type");

//     uint winningCandidateID;
//     uint maxVotes = 0;

//     if (dsType == districtType.local) {
//         for (uint i = 0; i < localDistricts[districtName].candidates.length; i++) {
//             if (localDistricts[districtName].candidates[i].VoteCount > maxVotes) {
//                 maxVotes = localDistricts[districtName].candidates[i].VoteCount;
//                 winningCandidateID = i;
//             }
//         }
//     } else if (dsType == districtType.regional) {
//         for (uint i = 0; i < regionalDistricts[districtName].candidates.length; i++) {
//             if (regionalDistricts[districtName].candidates[i].VoteCount > maxVotes) {
//                 maxVotes = regionalDistricts[districtName].candidates[i].VoteCount;
//                 winningCandidateID = i;
//             }
//         }
//     }

//     return (winningCandidateID, (dsType == districtType.local) ? localDistricts[districtName].candidates[winningCandidateID].fullname : regionalDistricts[districtName].candidates[winningCandidateID].fullname);
// }

