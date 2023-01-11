export const CONTRACT_ADDRESS = '0x49b88AF6E8187264b51EDc7935C1141c18E6cc28';
export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [],
    "name": "reload",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Customers",
    "outputs": [
      {
        "internalType": "string",
        "name": "customer",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "batch_count",
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
      }
    ],
    "name": "batchs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "unit",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "used",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "orderid",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "batchid",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.ProductPerUnit[]",
            "name": "p",
            "type": "tuple[]"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          }
        ],
        "internalType": "struct ErpContract.ProductInfo",
        "name": "info",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "create_at",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "finished_at",
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
        "name": "order_id",
        "type": "uint256"
      },
      {
        "internalType": "enum ErpContract.ORDER_STATUS",
        "name": "new_status",
        "type": "uint8"
      }
    ],
    "name": "changeOrderStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "batch_id",
        "type": "uint256"
      },
      {
        "internalType": "enum ErpContract.BATCH_STATUS",
        "name": "new_status",
        "type": "uint8"
      }
    ],
    "name": "changePBStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "str1",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "str2",
        "type": "string"
      }
    ],
    "name": "compare",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "unit",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "mat_id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          }
        ],
        "internalType": "struct ErpContract.ProductMaterial[]",
        "name": "mat_list",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256",
        "name": "sd",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ed",
        "type": "uint256"
      }
    ],
    "name": "createPB",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "supplier",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "customer",
        "type": "string"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "order_id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "unit",
            "type": "string"
          }
        ],
        "internalType": "struct ErpContract.Material[]",
        "name": "mtl_list",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256",
        "name": "rd",
        "type": "uint256"
      }
    ],
    "name": "createPO",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "supplier",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "customer",
        "type": "string"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "unit",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "used",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "orderid",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "batchid",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.ProductPerUnit[]",
            "name": "p",
            "type": "tuple[]"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          }
        ],
        "internalType": "struct ErpContract.ProductInfo[]",
        "name": "order_list",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256",
        "name": "rd",
        "type": "uint256"
      }
    ],
    "name": "createSO",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cus_count",
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
        "name": "batch_id",
        "type": "uint256"
      }
    ],
    "name": "finishProduce",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMaterialList",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "order_id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "unit",
            "type": "string"
          }
        ],
        "internalType": "struct ErpContract.Material[]",
        "name": "",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "supplier",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "customer",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "order_date",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "received_date",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "unit",
                    "type": "string"
                  },
                  {
                    "internalType": "bool",
                    "name": "used",
                    "type": "bool"
                  },
                  {
                    "internalType": "uint256",
                    "name": "orderid",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "batchid",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ErpContract.ProductPerUnit[]",
                "name": "p",
                "type": "tuple[]"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.ProductInfo[]",
            "name": "item_list",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "order_id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "unit",
                "type": "string"
              }
            ],
            "internalType": "struct ErpContract.Material[]",
            "name": "mtl_list",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "enum ErpContract.ORDER_STATUS",
                "name": "status",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.OrderEvent[]",
            "name": "timeline",
            "type": "tuple[]"
          },
          {
            "internalType": "bool",
            "name": "isSO",
            "type": "bool"
          }
        ],
        "internalType": "struct ErpContract.Order[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getOrderById",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "supplier",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "customer",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "order_date",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "received_date",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "unit",
                    "type": "string"
                  },
                  {
                    "internalType": "bool",
                    "name": "used",
                    "type": "bool"
                  },
                  {
                    "internalType": "uint256",
                    "name": "orderid",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "batchid",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ErpContract.ProductPerUnit[]",
                "name": "p",
                "type": "tuple[]"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.ProductInfo[]",
            "name": "item_list",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "order_id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "unit",
                "type": "string"
              }
            ],
            "internalType": "struct ErpContract.Material[]",
            "name": "mtl_list",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "enum ErpContract.ORDER_STATUS",
                "name": "status",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.OrderEvent[]",
            "name": "timeline",
            "type": "tuple[]"
          },
          {
            "internalType": "bool",
            "name": "isSO",
            "type": "bool"
          }
        ],
        "internalType": "struct ErpContract.Order",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum ErpContract.BATCH_STATUS",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isByStatus",
        "type": "bool"
      }
    ],
    "name": "getPBList",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "unit",
                    "type": "string"
                  },
                  {
                    "internalType": "bool",
                    "name": "used",
                    "type": "bool"
                  },
                  {
                    "internalType": "uint256",
                    "name": "orderid",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "batchid",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ErpContract.ProductPerUnit[]",
                "name": "p",
                "type": "tuple[]"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.ProductInfo",
            "name": "info",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "create_at",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "finished_at",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "mat_id",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.ProductMaterial[]",
            "name": "mat_list",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "enum ErpContract.BATCH_STATUS",
                "name": "status",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.BatchEvent[]",
            "name": "timeline",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct ErpContract.ProductBatch[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "partner",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isSO",
        "type": "bool"
      }
    ],
    "name": "getPOByPartnerOrAll",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "supplier",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "customer",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "order_date",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "received_date",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "unit",
                    "type": "string"
                  },
                  {
                    "internalType": "bool",
                    "name": "used",
                    "type": "bool"
                  },
                  {
                    "internalType": "uint256",
                    "name": "orderid",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "batchid",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ErpContract.ProductPerUnit[]",
                "name": "p",
                "type": "tuple[]"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.ProductInfo[]",
            "name": "item_list",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "order_id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "unit",
                "type": "string"
              }
            ],
            "internalType": "struct ErpContract.Material[]",
            "name": "mtl_list",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "enum ErpContract.ORDER_STATUS",
                "name": "status",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct ErpContract.OrderEvent[]",
            "name": "timeline",
            "type": "tuple[]"
          },
          {
            "internalType": "bool",
            "name": "isSO",
            "type": "bool"
          }
        ],
        "internalType": "struct ErpContract.Order[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "material_count",
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
      }
    ],
    "name": "materials",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "order_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "unit",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "order_count",
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
      }
    ],
    "name": "orders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "supplier",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "customer",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "order_date",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "received_date",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isSO",
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
    "name": "p",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "unit",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "used",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "orderid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "batchid",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "p_count",
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
    "name": "p_used",
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
    "name": "pi",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
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
      }
    ],
    "name": "pl",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "product_count",
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
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pu",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "unit",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "used",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "orderid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "batchid",
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
        "name": "productID",
        "type": "uint256"
      }
    ],
    "name": "useProduct",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]