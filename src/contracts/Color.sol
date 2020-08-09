// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./ERC721.sol";

contract Color is ERC721 {

	string[] public colors;
	mapping(string => bool) _colorExists;

	constructor() ERC721("Color","COLOR") public {
	}

	function mint(string memory _color) public {
		//Color - Add it and Track it
		require(!_colorExists[_color],"Color already exists");
		colors.push(_color);
		uint _id = colors.length;
		_mint(msg.sender, _id);
		_colorExists[_color] = true; 
	}
}