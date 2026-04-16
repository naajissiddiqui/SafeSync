// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserDetails {
    struct Tourist {
        string name;
        string contact;
        string aadhar;
        string passport;
        string nationality;
        string emergency;
    }

    mapping(address => Tourist) private tourists;

    event TouristRegistered(address indexed user);

    function registerTourist(
        string memory _name,
        string memory _contact,
        string memory _aadhar,
        string memory _passport,
        string memory _nationality,
        string memory _emergency
    ) public {
        tourists[msg.sender] = Tourist(_name, _contact, _aadhar, _passport, _nationality, _emergency);
        emit TouristRegistered(msg.sender);
    }

    function getTourist(address _user) public view returns (
        string memory name,
        string memory contact,
        string memory aadhar,
        string memory passport,
        string memory nationality,
        string memory emergency
    ) {
        Tourist memory t = tourists[_user];
        return (t.name, t.contact, t.aadhar, t.passport, t.nationality, t.emergency);
    }
}
