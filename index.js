class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }
  get value() {
    return this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');
console.log(myAccount.balance);

t1 = new Deposit(400, myAccount);
t1.commit();
console.log('Transaction 1:', t1.amount);
t2 = new Withdrawal(50.25, myAccount);
t2.commit();
console.log('Transaction 1:', t2.amount);

console.log('Balance:', myAccount.balance);
