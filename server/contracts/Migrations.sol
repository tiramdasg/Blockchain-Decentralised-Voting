pragma solidity ^0.5.0;

contract Migrations {
  address public admin;
  uint public last_completed_migration;

  constructor() public {
    admin = msg.sender;
  }

  modifier restricted() {
        require(msg.sender == admin, "Restricted to owner");
        _;
  }
  function setCompleted(uint completed) public restricted {
    require(completed != last_completed_migration, "New completed value must be different");
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    require(new_address != address(0), "Invalid address");
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
    last_completed_migration = 0; // Reset last_completed_migration after upgrade
  }
}