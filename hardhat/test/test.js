const { expect } = require("chai");

describe("ERP", function () {
    let contract;

    before(async () => {
        const erpContractFactory = await ethers.getContractFactory("ErpContract");
        contract = await erpContractFactory.deploy();
        await contract.deployed();
    });
    it("create PO", async function () {
        await contract.createPO("supplier1", "manager", [[1, 1, "vai", 50, "met"]], 1231231);
    });
    it("change PO PENDING", async function () {
        await contract.changeOrderStatus(1, 2);
    });
    it("change PO ACCEPTED", async function () {
        await contract.changeOrderStatus(1, 2);
    });
    it("change PO DELIVERING", async function () {
        await contract.changeOrderStatus(1, 4);
    });
    it("change PO RECEIVED", async function () {
        await contract.changeOrderStatus(1, 5);
    });
    it("create PB", async function () {
        await contract.createPB("Nike", "giay", 10, [[1, 10]], 1231231, 12313);
    });
    it("change PB PREPARE_MAT", async function () {
        const a = await contract.changeBatchStatus(1, 1);
    });
    it("change PB PRODUCE", async function () {
        const a = await contract.changeBatchStatus(1, 2);
    });
    it("change PB DONE", async function () {
        const a = await contract.changeBatchStatus(1, 4);
    });
    it("create SO", async function () {
        await contract.createSO("manager", "retailer", [[[[1, "Nike", "giay", false, 1, 1]], 5]], 1231231);
    });
    it("change SO ACCEPTED", async function () {
        await contract.changeOrderStatus(2, 1);
    });
    it("change SO DELIVERING", async function () {
        await contract.changeOrderStatus(2, 3);
    });
    it("change SO RECEIVED", async function () {
        await contract.changeOrderStatus(2, 4);
    });
    it("get products", async function () {
        const a = await contract.getProducts();
        console.log(a.product_list);
    });
    it("get products", async function () {
        const a = await contract.getOrder("", true);
    });
    /*
    */
    it("get material", async function () {
        const a = await contract.getMaterialList();
    });
    it("get PB by id", async function () {
        const pb = await contract.getPB(1);
        //console.log("Batch by id: pb", pb);
    });
    /* it("get PO by supplier", async function () {
        const po = await contract.getPOBySupplier("supplier1");
        //console.log("GET PO by supplier", po);
    });
    it("get SO by customer", async function () {
        const so = await contract.getSOByCustomer("retailer");
        //console.log("GET SO by supplier", so);
    });
    it("get all PO", async function () {
        const all = await contract.getAllPO();
        //console.log("All PO", all);
    });
    it("get all SO", async function () {
        const all = await contract.getAllSO();
        //console.log("All SO", all);
    }); */
    /* it("get order by id", async function () {
        const po = await contract.getOrderById(1);
        const so = await contract.getOrderById(2);
        //console.log("Order by id: po", po);
        //console.log("Order by id: so", so);
    })
    it("get PB by id", async function () {
        const pb = await contract.getPB(1);
        //console.log("Batch by id: pb", pb);
    });
    it("get PB list", async function () {
        const pb = await contract.getPBList(1, 1);
        //console.log("Batch by list: prepare", pb);
    })
    it("get material list", async function () {
        const mat = await contract.getMaterialList();
        //console.log("Material list", mat);
    });

    it("get products", async function () {
        await contract.getAllProduct();
    });
    it("get product per unit by id", async function () {
        await contract.getProductPUbyID(1);
    });
    it("get customer product", async function () {
        const a = await contract.getProductsCustomer("retailer");
        //console.log(a);
    }); */
    /* it("get all customer product", async function () {
        const a = await contract.getAllCusProduct();
        //console.log("all product customer", a);
    }); */
});

