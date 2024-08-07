$(document).ready(function() {
    // Navigation bar click event
    $('.nav-link').click(function() {
        var section = $(this).data('section');
        $('.section').removeClass('active');
        $('#' + section).addClass('active');
    });

    document.getElementById('submitCustomer').addEventListener('click', function() {
        // const customerId = document.getElementById('customerId').value;
        const customerName = document.getElementById('customerName').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerMobile = document.getElementById('customerMobile').value;

        const customerData = {
            // id: customerId,
            name: customerName,
            address: customerAddress,
            mobile: customerMobile
        };

        const customerJSON = JSON.stringify(customerData);

        $.ajax({
            url: "http://localhost:8080/Web_Pos_Backend_war_exploded/customer",
            type: "POST",
            data: customerJSON,
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                console.log("Result :", response);
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
            }
        });
    });


    // // Auto-generate Customer ID
    // let customerCount = 1;
    // $('#customerId').val('C-00' + customerCount);

    // // Submit Customer
    // $('#submitCustomer').click(function() {
    //     let id = $('#customerId').val();
    //     let name = $('#customerName').val();
    //     let address = $('#customerAddress').val();
    //     let mobile = $('#customerMobile').val();
    //     $('#customerTable').append('<tr><td>' + id + '</td><td>' + name + '</td><td>' + address + '</td><td>' + mobile + '</td></tr>');
    //     customerCount++;
    //     $('#customerId').val('C-00' + customerCount);
    //     $('#customerForm')[0].reset();
    // });
    //
    // // Auto-generate Item Code
    // let itemCount = 1;
    // $('#itemCode').val('I-00' + itemCount);
    //
    // // Submit Item
    // $('#submitItem').click(function() {
    //     let code = $('#itemCode').val();
    //     let description = $('#itemDescription').val();
    //     let price = $('#itemPrice').val();
    //     let qty = $('#itemQty').val();
    //     $('#itemTable').append('<tr><td>' + code + '</td><td>' + description + '</td><td>' + price + '</td><td>' + qty + '</td></tr>');
    //     itemCount++;
    //     $('#itemCode').val('I-00' + itemCount);
    //     $('#itemForm')[0].reset();
    // });
    //
    // // Add Order Item
    // $('#addItem').click(function() {
    //     let code = $('#selectItemCode').val();
    //     let name = $('#selectItemName').val();
    //     let price = $('#selectItemPrice').val();
    //     let qty = $('#selectItemQty').val();
    //     $('#selectedItemsTable').append('<tr><td>' + code + '</td><td>' + name + '</td><td>' + price + '</td><td>' + qty + '</td></tr>');
    //     $('#selectItemForm')[0].reset();
    // });
    //
    // // Sample Data for Orders
    // $('#orderDetailsTable').append('<tr><td>order-001</td><td>8/6/2024</td><td>C-001</td><td>1550</td><td>10</td><td>1395</td><td>5000</td><td>3605</td></tr>');
    // $('#orderDetailsTable').append('<tr><td>order-002</td><td>8/6/2024</td><td>C-002</td><td>5125</td><td>0</td><td>5125</td><td>3000</td><td>-2125</td></tr>');
});
