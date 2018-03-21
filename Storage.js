/*
Naive implementation of the datastructure
Nodes can be atomic values or lists of atomic values

TODO:
[ ] Should we be able to create empty nodes?
[ ] Should an atom be able to transform into a list?
[ ] Archiving nodes

[x] Accessing specific nodes in a lists
[ ] Transforming lists: reorder, sort, append, remove etc.
*/


var Storage = (function(){
    var iface = {}; //public interface

    //Actual data is stored in memory
    var nodes = [];
    var transactions = [];

    //Primitives


    function Node (value) {
        const transaction = transact();
        this.uid = nodes.length;
        this.type = Array.isArray(value) ? "list" : "atom";
        this.state = [{
            transaction: transaction,
            value: value
        }];

        this.update = function(value) {
            const transaction = transact();
            this.state.push({
                transaction: transaction,
                value: value
            });
            return this;
        };

        this.transactionAtTime = function(time){
            if(time===undefined){ //just return last value
                return this.state[this.state.length-1];
            } else { //return first value before time
                var finds = this.state.filter((s)=>{
                    return s.transaction.tid <= time;
                });

                if(finds.length === 0){
                    return undefined;
                }
                return finds[finds.length-1];
            }
        };

        this.value = function(time){
            var transaction = this.transactionAtTime(time);
            if(transaction === undefined){
                return undefined;
            }

            currentvalue = transaction.value;

            if(Array.isArray(currentvalue)){
                currentvalue = currentvalue.map((o)=>{
                    return o.value(time);
                });
            }

            return currentvalue;
        };

        //List specific functions
        if(this.type === "list"){
            this.get = function(pos, time){
                var transaction = this.transactionAtTime(time);
                return transaction.value[pos];
            };
        }

        nodes.push(this);
    }



    //transactor
    //keeps track of each unique transaction, the date & time that it happened, and the user that requested the transaction
    function transact(){
        const tid = transactions.length;
        const transaction = {
            tid: tid,
            timestamp: new Date(),
            user: 0
        };

        transactions.push(transaction);
        return transaction;
    }

    //Create new elements
    //Atoms are atomic values such as strings and numbers
    //Lists are arrays of atomic values or other lists
    iface.createNode = function(value){
        //TODO: filter out undefined
        if(Array.isArray(value)){
            //if it's a list, make sure it contains only nodes
            value = value.map((o)=>{
                if(Object.getPrototypeOf(o) !== Node.prototype){ //if it's not a node
                    return iface.createNode(o); //recursively create a node
                }
                return o;
            });
        }

        return new Node(value);
    };

    //updates a node, appends a new value
    iface.update = function(id, value){
        nodes[id].update(value);
    };

    iface.getById = function(id){
        return nodes[id];
    };

    iface.log = function(){
        console.log(nodes);
        console.log(transactions);
    };

    return iface;
})();


//A simple example

//Create some nodes
var a = Storage.createNode("spinach"); //Create an atomic value
var b = Storage.createNode(["broccoli", a]); //Create a list containing new and existing nodes
a.update("tomatoes"); //update the value of A

 //Read the historic values of b
console.log("b doesn't exist yet: ",b.value(1));
console.log("b get's created: ",b.value(2));
console.log("value of a get's updated: ",b.value());
console.log("get first element of b: ",b.get(0).value());
