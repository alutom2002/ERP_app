//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ErpContract {
    enum ORDER_STATUS {
        CREATED,
        PENDING,
        ACCEPTED,
        DENIED,
        DELIVERING,
        RECEIVED,
        CANCEL
    }
    enum BATCH_STATUS {
        CREATED,
        PREPARE_MAT,
        PRODUCE,
        DONE,
        CANCEL
    }
    struct ProductPerUnit {
        uint256 id;
        string name;
        string unit;
        bool used;
        uint256 orderid;
        uint256 batchid;
    }
    struct ProductInfo {
        ProductPerUnit[] p;
        uint256 quantity;
    }
    struct OrderEvent {
        ORDER_STATUS status;
        string name;
        uint256 timestamp;
    }
    struct Order {
        uint256 id;
        string supplier;
        string customer;
        uint256 order_date;
        uint256 received_date;
        ProductInfo[] item_list;
        Material[] mtl_list;
        OrderEvent[] timeline;
        bool isSO;
    }
    struct ProductsOfCustomer {
        string customer;
        ProductInfo[] product_list;
    }
    struct Material {
        uint256 id;
        uint256 order_id;
        string name;
        uint256 quantity;
        string unit;
    }
    struct ProductMaterial {
        uint256 mat_id;
        uint256 quantity;
    }
    struct BatchEvent {
        BATCH_STATUS status;
        uint256 timestamp;
    }
    struct ProductBatch {
        uint256 id;
        ProductInfo info;
        uint256 create_at;
        uint256 finished_at;
        ProductMaterial[] mat_list;
        BatchEvent[] timeline;
    }
    event reload();
    uint256 public p_count = 0;
    uint256 public p_used = 0;
    ProductPerUnit[] public p;
    ProductPerUnit public pu;
    ProductInfo[] public pl;
    ProductInfo public pi;
    uint256 public product_count = 0;
    mapping(uint256 => ProductInfo) public products;
    uint256 public order_count = 0;
    mapping(uint256 => Order) public orders;
    uint256 public batch_count = 0;
    mapping(uint256 => ProductBatch) public batchs;
    uint256 public material_count = 0;
    mapping(uint256 => Material) public materials;
    uint256 public cus_count = 0;
    mapping(uint256 => ProductsOfCustomer) public Customers;
        
    function createPO(string memory supplier,string memory customer,Material[] calldata mtl_list,uint256 rd) external {
        Order storage order = orders[++order_count];
        order.id = order_count;
        order.supplier = supplier;
        order.customer = customer;
        order.order_date = block.timestamp;
        order.received_date = rd;
        order.isSO = false;
        order.timeline.push(OrderEvent(ORDER_STATUS.CREATED, customer, block.timestamp));
        uint256 len = mtl_list.length;
        for (uint256 i = 0; i < len; i++) {
            order.mtl_list.push(mtl_list[i]);
        }
        emit reload();
    }
    function createSO(string memory supplier,string memory customer,ProductInfo[] calldata order_list,uint256 rd) external {
        Order storage order = orders[++order_count];
        order.id = order_count;
        order.supplier = supplier;
        order.customer = customer;
        order.order_date = block.timestamp;
        order.received_date = rd;
        order.isSO = true;
        order.timeline.push(OrderEvent(ORDER_STATUS.CREATED, supplier, block.timestamp));
        uint256 len = order_list.length;
        for (uint256 i = 0; i < len; i++) {
            order.item_list.push(order_list[i]);
        }
        emit reload();
    }
    function createPB(string memory name,string memory unit,uint256 quantity,ProductMaterial[] calldata mat_list,uint256 sd,uint256 ed) external {
        ProductBatch storage batch = batchs[++batch_count];
        batch.id = batch_count;
        ProductPerUnit memory info = ProductPerUnit({
            id: batch_count,
            name: name,
            unit: unit,
            used: false,
            orderid: order_count,
            batchid: batch_count
        });
        batch.info.p.push(info);
        batch.info.quantity = quantity;
        batch.create_at = sd;
        batch.finished_at = ed;
        batch.timeline.push(BatchEvent(BATCH_STATUS.CREATED, block.timestamp));
        uint256 len = mat_list.length;
        for (uint256 i = 0; i < len; i++) {
            materials[mat_list[i].mat_id].quantity -= mat_list[i].quantity;
            batch.mat_list.push(mat_list[i]);
        }
        emit reload();
    }
    function changeBatchStatus(uint256 batch_id, BATCH_STATUS new_status) external {
        batchs[batch_id].timeline.push(BatchEvent(new_status, block.timestamp));
        if (new_status != BATCH_STATUS.DONE) {
            emit reload();}
        else {
            delete p;
            uint256 orderid = materials[batchs[batch_id].mat_list[0].mat_id]
                .order_id;
            uint256 len = batchs[batch_id].info.quantity;

            for (uint256 i = 0; i < len; i++) {
                pu.id = ++p_count;
                pu.name = batchs[batch_id].info.p[0].name;
                pu.unit = batchs[batch_id].info.p[0].unit;
                pu.used = false;
                pu.batchid = batch_id;
                pu.orderid = orderid;
                p.push(pu);
            }
            ProductInfo storage producti4 = products[++product_count];
            for (uint256 i = 0; i < p.length; i++) {
                producti4.p.push(p[i]);
            }
            producti4.quantity = batchs[batch_id].info.quantity;
            delete p;
            emit reload();
        }
    }
    function changeOrderStatus(uint256 order_id, ORDER_STATUS new_status) external{
        if (new_status == ORDER_STATUS.DELIVERING && orders[order_id].isSO == true) {
            orders[order_id].timeline.push(OrderEvent(new_status, "", block.timestamp));
            uint256 len = orders[order_id].item_list.length;
            delete pl;
            for (uint256 i = 0; i < len; i++) {
                for (uint256 j = 1; j <= product_count; j++) {
                    if (compare(products[j].p[0].name,orders[order_id].item_list[i].p[0].name)) {
                        products[j].quantity -= orders[order_id].item_list[i].quantity;
                        delete p;
                        for (uint256 z = p_used;z < p_used + orders[order_id].item_list[i].quantity;z++) {
                            pu.id = products[j].p[z].id;
                            pu.name = products[j].p[z].name;
                            pu.unit = products[j].p[z].unit;
                            pu.used = false;
                            pu.batchid = products[j].p[z].batchid;
                            pu.orderid = products[j].p[z].orderid;
                            p.push(pu);
                        }
                        p_used += orders[order_id].item_list[i].quantity;
                        pi.p = p;
                        delete p;
                        pi.quantity = orders[order_id].item_list[i].quantity;
                    }
                }
                pl.push(pi);
            }
            ProductsOfCustomer storage cus = Customers[++cus_count];
            cus.customer = orders[order_id].customer;
            cus.product_list = pl;
            delete pl;
        } else if (new_status == ORDER_STATUS.RECEIVED && orders[order_id].isSO == false) {
            orders[order_id].timeline.push(OrderEvent(new_status, "", block.timestamp));
            uint256 lenMTL = orders[order_id].mtl_list.length;
            for (uint256 i = 0; i < lenMTL; i++) {
                Material storage mtl = materials[++material_count];
                mtl.id = material_count;
                mtl.order_id = order_id;
                mtl.name = orders[order_id].mtl_list[i].name;
                mtl.quantity = orders[order_id].mtl_list[i].quantity;
                mtl.unit = orders[order_id].mtl_list[i].unit;
            }
        } else {
            orders[order_id].timeline.push(OrderEvent(new_status, "", block.timestamp));
        }
        emit reload();
    }
    function compare(string memory str1, string memory str2) public pure returns (bool){
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
    function useProduct(uint256 productID) external returns (bool) {
        for (uint256 i = 1; i <= product_count; i++) {
            uint256 len = products[i].p.length;
            for (uint256 j = 0; j < len; j++) {
                if (products[i].p[j].id == productID && products[i].p[j].used == false) {
                    products[i].p[j].used = true;
                    return true;
                }
            }
        }
        return false;
    }
    function getOrder(string memory partner, bool isSO)external view returns (Order[] memory){
        Order[] memory list = new Order[](order_count);
        uint256 count = 0;
        if (compare(partner, "")) {
            for (uint256 i = 1; i <= order_count; i++) {
                if (orders[i].isSO == isSO) {
                    list[count++] = orders[i];
                }
            }
        }
        else {
            for (uint256 i = 1; i <= order_count; i++) {
                if ((compare(orders[i].supplier, partner) || compare(orders[i].customer, partner)) && orders[i].isSO == isSO) {
                    list[count++] = orders[i];
                }
            }
        }
        return list;
    }
    function getOrderById(uint256 id) external view returns (Order memory) {
        return orders[id];
    }
    function getProducts() external view returns (ProductInfo[] memory, ProductsOfCustomer[] memory) {
        ProductInfo[] memory ppp = new ProductInfo[](product_count);
        for (uint256 i = 1; i <= product_count; i++) {
            ppp[i - 1] = products[i];
        }
        ProductsOfCustomer[] memory ppp2 = new ProductsOfCustomer[](cus_count);
        for (uint256 i = 1; i <= cus_count; i++) {
            ppp2[i - 1] = Customers[i];
        }

        return (ppp,ppp2);
    }
    /* function getPBList(BATCH_STATUS status, bool isByStatus) external view returns (ProductBatch[] memory){
        ProductBatch[] memory list = new ProductBatch[](batch_count);
        uint256 count = 0;
        for (uint256 i = 1; i <= batch_count; i++) {
            if (isByStatus == true) {
                uint256 timeline_count = batchs[i].timeline.length;
                BATCH_STATUS current_status = batchs[i].timeline[timeline_count - 1].status;
                if (current_status == status) {
                    list[count++] = batchs[i];
                }
            } else {
                list[count++] = batchs[i];
            }
        }
        return list;
    } */
    function getMaterialList() external view returns (Material[] memory, Order[] memory){
        Material[] memory mat_list = new Material[](material_count);
        Order[] memory mat_order_list = new Order[](material_count);
        for (uint256 i = 1; i <= material_count; i++) {
            mat_list[i - 1] = materials[i];
            mat_order_list[i - 1] = orders[materials[i].order_id];
        }
        return (mat_list, mat_order_list);
    }
    function getPB(uint batch_id) external view returns(ProductBatch memory, Material[] memory){
        uint len = batchs[batch_id].mat_list.length;
        Material[] memory mat_list = new Material[](len);
        for(uint i=0; i<len; i++){
            uint mat_id = batchs[batch_id].mat_list[i].mat_id;
            mat_list[i] = materials[mat_id];
        }
        return (batchs[batch_id], mat_list);
    }
}