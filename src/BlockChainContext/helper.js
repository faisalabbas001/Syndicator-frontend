import {ethers,BigNumber} from 'ethers';
export const  abi=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "asset_index",
				"type": "uint256"
			}
		],
		"name": "accept_multi_offer_with_coins",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "asset_index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "address_of_asset_to_accept",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "num_tokens",
				"type": "uint256"
			}
		],
		"name": "accept_multi_offer_with_tokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			}
		],
		"name": "accept_single_offer_with_coins",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num_tokens",
				"type": "uint256"
			}
		],
		"name": "accept_single_offer_with_tokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "user_group_id",
				"type": "uint256"
			}
		],
		"name": "add_include_group",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "asset_index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "address_of_asset_to_cancel",
				"type": "address"
			}
		],
		"name": "cancel_multi_offer_part",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ReentrancyGuardReentrantCall",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount_added",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "new_balance",
				"type": "uint256"
			}
		],
		"name": "BalanceAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount_withdrawn",
				"type": "uint256"
			}
		],
		"name": "BalanceWithdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			}
		],
		"name": "cancel_offer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "chunk_size",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_address",
						"type": "address"
					}
				],
				"internalType": "struct Escrow.Asset[]",
				"name": "equivalent_assets",
				"type": "tuple[]"
			},
			{
				"internalType": "uint256",
				"name": "num_chunks",
				"type": "uint256"
			}
		],
		"name": "create_multi_coin_offer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "chunk_size",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_address",
						"type": "address"
					}
				],
				"internalType": "struct Escrow.Asset[]",
				"name": "equivalent_assets",
				"type": "tuple[]"
			},
			{
				"internalType": "uint256",
				"name": "num_chunks",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "held_asset_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "held_asset_address",
				"type": "address"
			}
		],
		"name": "create_multi_token_offer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "chunk_size",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_address",
						"type": "address"
					}
				],
				"internalType": "struct Escrow.Asset",
				"name": "equivalent_asset",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "num_chunks",
				"type": "uint256"
			}
		],
		"name": "create_single_coin_offer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "chunk_size",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_address",
						"type": "address"
					}
				],
				"internalType": "struct Escrow.Asset",
				"name": "equivalent_asset",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "num_chunks",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "held_asset_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "held_asset_address",
				"type": "address"
			}
		],
		"name": "create_single_token_offer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "include_self",
				"type": "bool"
			},
			{
				"internalType": "address[]",
				"name": "members",
				"type": "address[]"
			}
		],
		"name": "create_user_group",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "asset_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "asset_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "num_chunks",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "chunk_size",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "chunk_size",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_address",
						"type": "address"
					}
				],
				"indexed": false,
				"internalType": "struct Escrow.Asset[]",
				"name": "equivalent_assets",
				"type": "tuple[]"
			}
		],
		"name": "MultipleOfferCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "taker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "accepted_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "accepted_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount_purchased",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "remaining_in_offer",
				"type": "uint256"
			}
		],
		"name": "OfferAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			}
		],
		"name": "OfferCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			}
		],
		"name": "OfferComplete",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "asset_address",
				"type": "address"
			}
		],
		"name": "OfferPartiallyCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "address_of_asset_to_update",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "new_chunk_size",
				"type": "uint256"
			}
		],
		"name": "OfferUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			}
		],
		"name": "remove_include_group",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "user_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "asset_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "asset_amount",
				"type": "uint256"
			}
		],
		"name": "RevenueGenerated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "asset_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "asset_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "num_chunks",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "chunk_size",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "chunk_size",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_address",
						"type": "address"
					}
				],
				"indexed": false,
				"internalType": "struct Escrow.Asset",
				"name": "equivalent_asset",
				"type": "tuple"
			}
		],
		"name": "SingleOfferCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "asset_index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "address_of_asset_to_update",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "new_chunk_size",
				"type": "uint256"
			}
		],
		"name": "update_multi_offer_chunk_size",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "new_chunk_size",
				"type": "uint256"
			}
		],
		"name": "update_single_offer_chunk_size",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "user_group_id",
				"type": "uint256"
			}
		],
		"name": "UserGroupAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "group_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "creator_included",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "members",
				"type": "address[]"
			}
		],
		"name": "UserGroupCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			}
		],
		"name": "UserGroupRemoved",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw_coins",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "user_group_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "is_user_in_group",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "offer_include_groups",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platform_fee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platform_fee_decimal_factor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platform_fee_decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "platform_revenue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offer_id",
				"type": "uint256"
			}
		],
		"name": "read_offer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "chunk_size",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "asset_address",
								"type": "address"
							}
						],
						"internalType": "struct Escrow.Asset",
						"name": "owned_asset",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "chunk_size",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "asset_address",
								"type": "address"
							}
						],
						"internalType": "struct Escrow.Asset[]",
						"name": "requested_assets",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Escrow.Offer",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_offers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "user_coin_balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "user_groups",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
export const contractAddress="0x4C2621766B11784C0472200C3b1DfE654C5A7188";
export const decimal=18;

export const formater = (value) => {
  try {
    // Convert the value to a string without scientific notation
    const valueAsString = value.toLocaleString('fullwide', { useGrouping: false });
    return ethers.utils.formatUnits(BigNumber.from(valueAsString), 18); 
  } catch (error) {
    console.error("Error formatting value:", error);
    return "N/A";
  }
};

export const formaterWithInteger = (value) => {
	try {
		// Ensure the value is a BigNumber and avoid converting it to a floating-point number
		const bigValue = BigNumber.from(value); // Handle it as a BigNumber from the start
	
		// Format the BigNumber value using 18 decimals (assuming the value is in Wei or other 18 decimal units)
		const formattedValue = ethers.utils.formatUnits(bigValue, 18);
	
		return formattedValue;
	  } catch (error) {
		console.error("Error formatting value:", error);
		return "N/A";
	  }
  };

export const erc20Abi = [
	{
	  constant: true,
	  inputs: [],
	  name: 'name',
	  outputs: [
		{
		  name: '',
		  type: 'string',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: false,
	  inputs: [
		{
		  name: '_spender',
		  type: 'address',
		},
		{
		  name: '_value',
		  type: 'uint256',
		},
	  ],
	  name: 'approve',
	  outputs: [
		{
		  name: '',
		  type: 'bool',
		},
	  ],
	  payable: false,
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [],
	  name: 'totalSupply',
	  outputs: [
		{
		  name: '',
		  type: 'uint256',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: false,
	  inputs: [
		{
		  name: '_from',
		  type: 'address',
		},
		{
		  name: '_to',
		  type: 'address',
		},
		{
		  name: '_value',
		  type: 'uint256',
		},
	  ],
	  name: 'transferFrom',
	  outputs: [
		{
		  name: '',
		  type: 'bool',
		},
	  ],
	  payable: false,
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [],
	  name: 'decimals',
	  outputs: [
		{
		  name: '',
		  type: 'uint8',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [
		{
		  name: '_owner',
		  type: 'address',
		},
	  ],
	  name: 'balanceOf',
	  outputs: [
		{
		  name: 'balance',
		  type: 'uint256',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [],
	  name: 'symbol',
	  outputs: [
		{
		  name: '',
		  type: 'string',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: false,
	  inputs: [
		{
		  name: '_to',
		  type: 'address',
		},
		{
		  name: '_value',
		  type: 'uint256',
		},
	  ],
	  name: 'transfer',
	  outputs: [
		{
		  name: '',
		  type: 'bool',
		},
	  ],
	  payable: false,
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [
		{
		  name: '_owner',
		  type: 'address',
		},
		{
		  name: '_spender',
		  type: 'address',
		},
	  ],
	  name: 'allowance',
	  outputs: [
		{
		  name: '',
		  type: 'uint256',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  payable: true,
	  stateMutability: 'payable',
	  type: 'fallback',
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  name: 'owner',
		  type: 'address',
		},
		{
		  indexed: true,
		  name: 'spender',
		  type: 'address',
		},
		{
		  indexed: false,
		  name: 'value',
		  type: 'uint256',
		},
	  ],
	  name: 'Approval',
	  type: 'event',
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  name: 'from',
		  type: 'address',
		},
		{
		  indexed: true,
		  name: 'to',
		  type: 'address',
		},
		{
		  indexed: false,
		  name: 'value',
		  type: 'uint256',
		},
	  ],
	  name: 'Transfer',
	  type: 'event',
	},
  ];
export const testTokenAddress="0x043910B9D6Bf8AF5d088eA22948b8397f240fA4f";
export const zeroAddress='0x0000000000000000000000000000000000000000';