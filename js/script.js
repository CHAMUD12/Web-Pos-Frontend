$(document).ready(function() {
    // Navigation bar click event
    $('.nav-link').click(function() {
        var section = $(this).data('section');
        $('.section').removeClass('active');
        $('#' + section).addClass('active');
    });
    // -------------- save customer --------------
    document.getElementById('submitCustomer').addEventListener('click', function() {
        const customerName = document.getElementById('customerName').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerMobile = document.getElementById('customerMobile').value;

        const customerData = {
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
                // Assuming response has the format {"id": "generated_id", "result": "success"}
                const customerId = response.id;
                document.getElementById('customerId').value = customerId;
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
            }
        });
    });
});

// -------------- get all customer to table --------------
$(document).ready(function() {
    // Fetch and display customer data
    function loadCustomers() {
        $.ajax({
            url: "http://localhost:8080/Web_Pos_Backend_war_exploded/customer",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var customerTable = $('#customerTable');
                customerTable.empty(); // Clear existing data
                response.forEach(function(customer) {
                    var row = '<tr class="new-row">' +
                        '<td>' + customer.id + '</td>' +
                        '<td>' + customer.name + '</td>' +
                        '<td>' + customer.address + '</td>' +
                        '<td>' + customer.mobile + '</td>' +
                        '</tr>';
                    customerTable.append(row);
                });
                // Highlight new rows briefly
                // $('.new-row').css('background-color', '#d4edda');
                // setTimeout(function() {
                //     $('.new-row').css('background-color', '');
                // }, 1000);
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
            }
        });
    }
    
    // Load customers on page load
    loadCustomers();

    // Poll for new data every 5 seconds
    setInterval(loadCustomers, 5000);
});

// -------------- search customer --------------

$("#searchCustomer").on("input", function () {
    var searchValue = $(this).val().toLowerCase();
    $("#customerTable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
    });
  });

  $("#searchCustomer").keypress(function (event) {
    if (event.which == 13) {
      var firstVisibleRow = $("#customerTable tr:visible").first();
      if (firstVisibleRow.length > 0) {
        var id = firstVisibleRow.data("id");
        var customerName = firstVisibleRow.find("td:nth-child(2)").text();
        var customerAddress = firstVisibleRow.find("td:nth-child(3)").text();
        var customerMobile = firstVisibleRow.find("td:nth-child(4)").text();
        $("#customerName").val(customerName);
        $("#customerAddress").val(customerAddress);
        $("#customerMobile").val(customerMobile);
        $("#updateCustomer").data("id", id); // Store customer ID for update
      }
    }
});