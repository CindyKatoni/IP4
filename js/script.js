(function ($) {
    const prices = [
        ["large", 1200],
        ["medium", 850],
        ["small", 600],
        ['crispy', 200],
        ["stuffed", 150],
        ["gluten-free", 180],
        ["cheese", 100],
        ["bacon", 100],
        ["mushrooms", 100],
    ];

    $("#orderpizza").submit(function (event) {
        event.preventDefault();

        const pizzaType = $("#type option:selected").val();

        const pizzaSize = $("#size option:selected").val();

        const pizzaCrust = $("#crust option:selected").val();

        const toppingsArray = [];

        $("input[name='toppings']:checked").each(function () {
            toppingsArray.push($(this).val());
        });

        //filter the prices array to get the prices using size and crust
        const pizzaOrderPrices = prices.filter(function (price) {
            return price[0] === pizzaCrust || price[0] === pizzaSize;
        });

        //Add the toppings to the pizzaOrderPrices array if any have been selected
        if (toppingsArray.length > 0) {
            toppingsArray.map(function (topping) {
                // filter the prices array using each topping
                const toppingsPrices = prices.filter(function (price) {
                    return price[0] === topping;
                });
                //Add each topping and price to the pizzaOrderPrices
                return toppingsPrices.map(function(toppingPriceArray) {
                    pizzaOrderPrices.push(toppingPriceArray)
                });
            });
        }

        // calculate the full order price by mapping through thr pizzaOrderPrices array
        // and adding the prices
        let orderTotal = 0;
        pizzaOrderPrices.map(function(orderPrice) {
            return orderTotal += orderPrice[1];
        });

        // _.startCase from Lodash javascript library
        if (orderTotal > 0) {
            $(".choise, .deliver, #addedprice, #finallmessage").show(3000);
            $("#ordersmade").html(`
                <tr>
                    <td id="pizzaname" class="text-light">${_.startCase(pizzaType)}</td>
                    <td id="pizzasize" class="text-light">${_.startCase(pizzaSize)}</td>
                    <td id="pizzacrust" class="text-light">${_.startCase(pizzaCrust)}</td>
                    <td id="pizzatopping" class="text-light">${_.startCase(toppingsArray.toString())}</td>
                    <td id="totals" class="text-light">${orderTotal}</td>
                    <td id="cancel-order" class="text-light"><i class="text-light fas fa-trash-alt"></i></td>
                </tr>
            `);
            $('#pizzatotal').html(`
            
            `);
            $('#totalbill').html(`
            
            `);
        }

        console.log(pizzaType, pizzaOrderPrices, orderTotal);

    })
})(jQuery);