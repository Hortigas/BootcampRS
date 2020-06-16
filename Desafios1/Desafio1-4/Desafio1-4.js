class bankAccount {
    constructor(name) {
        this.name = name;
        this.balance = 0;
        this.transactions = [];
    }
    createTransaction(transaction) {
        this.transactions.push(transaction);
        transaction.type === 'credit'
            ? (this.balance += transaction.value)
            : (this.balance -= transaction.value);
    }
    getHigherTransactionByType(type) {
        let highValue = 0;
        for (let transaction of this.transactions)
            if (transaction.type === type)
                if (highValue < transaction.value)
                    highValue = transaction.value;
        return { type: type, value: highValue };
    }
    getAverageTransactionValue() {
        let i,
            sum = 0;
        for (i = 0; i < this.transactions.length; i++) {
            sum += this.transactions[i].value;
        }
        return sum / i;
    }
    getTransactionsCount() {
        let creditCount = 0,
            debitCount = 0;
        for (let transaction of this.transactions) {
            transaction.type === 'credit' ? creditCount++ : debitCount++;
        }
        return { credit: creditCount, debit: debitCount };
    }
}

let conta = new bankAccount('Mariana');

conta.createTransaction({ type: 'credit', value: 50 });
conta.createTransaction({ type: 'credit', value: 120 });
conta.createTransaction({ type: 'debit', value: 80 });
conta.createTransaction({ type: 'debit', value: 30 });

console.log(conta.balance); // 60

console.log(conta.getHigherTransactionByType('credit')); // { type: 'credit', value: 120 }
console.log(conta.getHigherTransactionByType('debit')); // { type: 'debit', value: 80 }

console.log(conta.getAverageTransactionValue()); // 70

console.log(conta.getTransactionsCount()); // { credit: 2, debit: 2 }
