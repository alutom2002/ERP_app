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
        await contract.changeBatchStatus(1, 1);
    });
    it("change PB PRODUCE", async function () {
        await contract.changeBatchStatus(1, 2);
    });
    it("change PB DONE", async function () {
        await contract.changeBatchStatus(1, 4);
    });
    it("create SO", async function () {
        await contract.createSO("manager", "retailer", [[[[0, "Nike", "giay", false, 0, 0]], 5]], 1231231);
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
    it("use products", async function () {
        await contract.useProduct(1);
    });
    it("get products", async function () {
        await contract.getProducts();
    });
    it("get products", async function () {
        await contract.getOrder("", true);
    });
    it("get material", async function () {
        await contract.getMaterialList();
    });
    it("get PB by id", async function () {
        await contract.getPB(1);
    });
    it("get order by id", async function () {
        await contract.getOrderById(1);

    })
});

