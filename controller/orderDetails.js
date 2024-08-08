$(document).ready(function() {
    // Function to load order details
    function loadOrderDetails() {
        $.ajax({
            url: "http://localhost:8080/Web_Pos_Backend_war_exploded/orders",
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                var orderDetailsTable = $('#orderDetailsTable');
                orderDetailsTable.empty(); // Clear existing table data

                response.forEach(function(order) {
                    var newRow = `
                        <tr>
                            <td>${order.orderId}</td>
                            <td>${order.orderDate}</td>
                            <td>${order.customerId}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>${order.discount.toFixed(2)}</td>
                            <td>${order.subTotal.toFixed(2)}</td>
                            <td>${order.cash.toFixed(2)}</td>
                            <td>${order.balance.toFixed(2)}</td>
                        </tr>
                    `;
                    orderDetailsTable.append(newRow);
                });
            },
            error: function(xhr, status, error) {
                console.error("Failed to load order details:", status, error);
            }
        });
    }

    // Load the order details when the page loads
    loadOrderDetails();

    // Optionally, you can refresh the order details table periodically
    // setInterval(loadOrderDetails, 60000); // Refresh every 60 seconds
});
