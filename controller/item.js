$(document).ready(function () {
    // Save item
    document
      .getElementById("submitItem")
      .addEventListener("click", function () {
        const itemCode = document.getElementById("itemCode").value;
        const itemDescription = document.getElementById("itemDescription").value;
        const itemPrice = document.getElementById("itemPrice").value;
        const itemQty = document.getElementById("itemQty").value;
  
        const itemData = {
          code: itemCode,
          description: itemDescription,
          price: itemPrice,
          qty: itemQty,
        };
  
        const itemJSON = JSON.stringify(itemData);
  
        $.ajax({
          url: "http://localhost:8080/Web_Pos_Backend_war_exploded/item",
          type: "POST",
          data: itemJSON,
          contentType: "application/json; charset=utf-8",
          success: function (response) {
            console.log("Result:", response);
            const itemCode = response.code;
            document.getElementById("itemCode").value = itemCode;
          },
          error: function (xhr, status, error) {
            console.error("Error:", status, error);
          },
        });
      });
  });
  