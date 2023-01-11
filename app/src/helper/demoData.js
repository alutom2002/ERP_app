export const mat_order_list = [
    {
        id: 1,
        supplier: {
            name: 'Supplier 001',
            address: '0x00000000000000000000000000000000000'
        },
        customer: {
            name: 'Manager',
            address: '0x00000000000000000000000000000000000'
        },
        order_date: Date.now(),
        received_date: Date.now(),
        order_list: [
            {
                name: 'hoa chat 1',
                quantity: '10',
                unit: 'lit'
            },
            {
                name: 'hoa chat 2',
                quantity: '10',
                unit: 'lit'
            },
        ],
        timeline: [
            {
                status: 0,
                timestamp: Date.now()
            },
            {
                status: 1,
                timestamp: Date.now()
            },
            {
                status: 2,
                timestamp: Date.now()
            },
            {
                status: 4,
                timestamp: Date.now()
            },
            {
                status: 5,
                timestamp: Date.now()
            }
        ]
    },
    {
        id: 2,
        supplier: {
            name: 'Supplier 001',
            address: '0x00000000000000000000000000000000000'
        },
        customer: {
            name: 'Manager',
            address: '0x00000000000000000000000000000000000'
        },
        order_date: Date.now(),
        received_date: Date.now(),
        order_list: [
            {
                name: 'hoa chat 1',
                quantity: '10',
                unit: 'lit'
            },
            {
                name: 'hoa chat 2',
                quantity: '10',
                unit: 'lit'
            },
            {
                name: 'hoa chat 3',
                quantity: '10',
                unit: 'lit'
            },
            {
                name: 'hoa chat 4',
                quantity: '10',
                unit: 'lit'
            },
        ],
        timeline: [
            {
                status: 0,
                timestamp: Date.now()
            },
            {
                status: 1,
                timestamp: Date.now()
            },
            {
                status: 2,
                timestamp: Date.now()
            },
        ]
    },
];