const app = new Vue({
    'el': '#app',
    data: {
        subtotal: 0,
        due_date: '',
        name: '',
        address: '',
        phone: '',
        id: '',
        tax: 17.5,
        taxamount: '',
        items: [{
            description: '',
            price: '',
            quantity: '',
            total: 0,
        }],
        totalPrice: 0,
        nextItemId: 0
    },
    methods: {
        addNewRow() {
            this.items.push({
                id: '',
                description: '',
                price: '',
                quantity: '',
                total: 0
            });
        },
        deleteRow(index, item) {
            let idx = this.items.indexOf(item);
            console.log(idx, index);
            if (idx > -1) {
                this.items.splice(idx, 1);
            }
            this.calculateTotal();
        },
        calculateTotal() {
            var subtotal, total, taxamount;
            subtotal = this.items.reduce(function (sum, product) {
                var lineTotal = parseFloat(product.total);
                if (!isNaN(lineTotal)) {
                    return sum + lineTotal;
                }
            }, 0);

            this.subtotal = subtotal.toFixed(2);
            taxamount = (subtotal * (this.tax / 100));
            total = taxamount + subtotal;
            total = parseFloat(total);
            if (!isNaN(total)) {
                this.totalPrice = total.toFixed(2);
                this.taxamount = taxamount.toFixed(2);
            } else {
                this.totalPrice = '0.00';
            }
        },
        calculateItemTotal(item) {
            var total = parseFloat(item.price) * parseFloat(item.quantity);

            if (!isNaN(total)) {
                item.total = total.toFixed(2);
            }
            this.calculateTotal();
        }

    }
})