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
        bool isRegistred;
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

    function voterRegistration(uint _age, string memory _cin, string memory _region, string memory _localDistrict) public{
    require(_age > 18, "Age must be greater than eighteen");
    require(localDistricts[_localDistrict].voters[msg.sender].isRegistred == false,"You are not registred");
    

        localDistricts[_localDistrict].voters[msg.sender] = Voter(_age, _cin, _region, _localDistrict, false, false, true);
		localDistricts[_localDistrict].numberOfVoters++;
        localDistricts[_localDistrict].voters[msg.sender].isRegistred = true;

        regionalDistricts[_region].voters[msg.sender] = Voter(_age, _cin, _region, _localDistrict, false, false, true);
		regionalDistricts[_region].numberOfVoters++;
        regionalDistricts[_region].voters[msg.sender].isRegistred = true;
    
}



function voteLocal(string memory candidateFullName, districtType dsType, string memory localDistrictName) public {
    require(electionStarted, "Election not started.");
    require(dsType == districtType.local, "Invalid district type");
    require(localDistricts[localDistrictName].voters[msg.sender].hasVotedLocal == false, "You have already voted in this local district");

        localDistricts[localDistrictName].candidates[candidateFullName].VoteCount++;
        localDistricts[localDistrictName].voters[msg.sender].hasVotedLocal = true;

}

function voteRegional(string memory candidateFullName, districtType dsType, string memory regionName) public {
    require(electionStarted, "Election not started.");

    require(dsType == districtType.regional, "Invalid district type");
    require(regionalDistricts[regionName].voters[msg.sender].hasVotedRegional == false, "You have already voted in this regional district");

        regionalDistricts[regionName].candidates[candidateFullName].VoteCount++;
        regionalDistricts[regionName].voters[msg.sender].hasVotedRegional = true;

}



function getLocalCandidate(string memory localDistrictName) public view returns (string[] memory, string[] memory, uint[] memory) {
    uint numCandidates = localDistricts[localDistrictName].candidatesTable.length;
    string[] memory parties = new string[](numCandidates);
    string[] memory names = new string[](numCandidates);
    uint[] memory voteCounts = new uint[](numCandidates);

    for (uint i = 0; i < numCandidates; i++) {
        parties[i] = localDistricts[localDistrictName].candidatesTable[i].party;
        names[i] = localDistricts[localDistrictName].candidatesTable[i].fullname;
        voteCounts[i] = localDistricts[localDistrictName].candidatesTable[i].VoteCount;
    }

    return (parties, names, voteCounts);
}

function getRegionCandidate(string memory localDistrictName) public view returns (string[] memory, string[] memory, uint[] memory) {
    uint numCandidates = localDistricts[localDistrictName].candidatesTable.length;
    string[] memory parties = new string[](numCandidates);
    string[] memory names = new string[](numCandidates);
    uint[] memory voteCounts = new uint[](numCandidates);

    for (uint i = 0; i < numCandidates; i++) {
        parties[i] = localDistricts[localDistrictName].candidatesTable[i].party;
        names[i] = localDistricts[localDistrictName].candidatesTable[i].fullname;
        voteCounts[i] = localDistricts[localDistrictName].candidatesTable[i].VoteCount;
    }

    return (parties, names, voteCounts);
}
		
function winnerCandidateRegional(string memory regionalDistrictName)public  {
		require(regionalDistricts[regionalDistrictName].dsType == districtType.regional, "Le district n'est pas local");
		 
		uint seatsToWin = regionalDistricts[regionalDistrictName].seatsToWin;

		uint electoralDenominator = regionalDistricts[regionalDistrictName].numberOfVoters / seatsToWin;
        uint maxVotes = regionalDistricts[regionalDistrictName].candidatesTable[0].VoteCount;
        
        do{

        for(uint i = 0; i < regionalDistricts[regionalDistrictName].candidatesTable.length; i++) {
            uint votes = regionalDistricts[regionalDistrictName].candidatesTable[i].VoteCount;
            
            
            if(votes > maxVotes) {
                maxVotes = votes;
                regionalDistricts[regionalDistrictName].candidatesTable[i].seatsWon++;
                votes -= electoralDenominator;
            }
        }
        
        regionalDistricts[regionalDistrictName].seatsToWin--;
        
        }while (regionalDistricts[regionalDistrictName].seatsToWin != 0);
        
}

function getCandidateSeatsWon(string memory districtName, districtType dsType, string memory candidateFullName) public view returns (uint) {
    require(dsType == districtType.local || dsType == districtType.regional, "Invalid district type");

    if (dsType == districtType.local) {
        return localDistricts[districtName].candidates[candidateFullName].seatsWon;
    } else {
        return regionalDistricts[districtName].candidates[candidateFullName].seatsWon;
    }
}
function getDistrictInfo(string memory districtName, districtType dsType) public view returns (string memory, uint, uint) {
    District storage district = dsType == districtType.local ? localDistricts[districtName] : regionalDistricts[districtName];
    return (district.name, district.seatsToWin, district.numberOfVoters);
}

function getVoterInfo(address voterAddress, string memory districtName, districtType dsType) public view returns (uint, string memory, bool, bool, bool) {
    Voter memory voter;
    if (dsType == districtType.local) {
        voter = localDistricts[districtName].voters[voterAddress];
    } else {
        voter = regionalDistricts[districtName].voters[voterAddress];
    }
    return (voter.age, voter.cin, voter.hasVotedLocal, voter.hasVotedRegional, voter.isRegistred);
}

function getCandidateInfo(string memory candidateFullName, string memory districtName, districtType dsType) public view returns (string memory, uint, Gender, string memory, uint, uint) {
    Candidate memory candidate;
    if (dsType == districtType.local) {
        candidate = localDistricts[districtName].candidates[candidateFullName];
    } else {
        candidate = regionalDistricts[districtName].candidates[candidateFullName];
    }
    return (candidate.fullname, candidate.age, candidate.gender, candidate.party, candidate.VoteCount, candidate.seatsWon);
}

}


// function winnerCandidateRegional(string memory regionalDistrictName) public {
//     require(regionalDistricts[regionalDistrictName].dsType == districtType.regional, "District type should be regional");

//     District storage district = regionalDistricts[regionalDistrictName];
//     uint seatsToWin = district.seatsToWin;
//     uint totalVotes = district.numberOfVoters; // Assuming this represents the total votes cast in the district

//     // Ensure there are seats to allocate and votes have been cast
//     require(seatsToWin > 0, "No seats to allocate");
//     require(totalVotes > 0, "No votes cast");

//     // Calculate votes required per seat using the total votes and seats available
//     uint votesPerSeat = totalVotes / seatsToWin;

//     // Use a temporary array to avoid modifying the original candidates array during iteration
//     Candidate[] memory sortedCandidates = new Candidate[](district.candidatesTable.length);
//     do{
//     for (uint i = 0; i < district.candidatesTable.length; i++) {
//         sortedCandidates[i] = district.candidatesTable[i];
//     }

//     // Sort the candidates by vote count in descending order
//     // Simple insertion sort for demonstration; we will consider a more efficient sorting algorithm for larger datasets
//     for (uint i = 1; i < sortedCandidates.length; i++) {
//         Candidate memory key = sortedCandidates[i];
//         uint j = i - 1;
//         while ((int(j) >= 0) && (sortedCandidates[j].VoteCount < key.VoteCount)) {
//             sortedCandidates[j + 1] = sortedCandidates[j];
//             j--;
//         }
//         sortedCandidates[j + 1] = key;
//     }

//     sortedCandidates[0].VoteCount -= votesPerSeat;
//     district.candidates[sortedCandidates[0].fullname].seatsWon++;
//     district.seatsToWin--;

// }while(district.seatsToWin != 0);

//     }

