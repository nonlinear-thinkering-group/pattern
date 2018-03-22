var FrameStack = (function(){

    //The framestack keeps track of all individual operations and different frames of reference.
    //It takes operations as inputs
    //It outputs a queryable datastructure based on your current view

    //Primitive operations:
    //* Push Frame:  PUF
    //* Pop Frame:   POF
    //* Create Node: CN
    //* Update Node: UN
    //* Create List: CL
    //* Update List: UL
    //* Originate: O

    var uuid = 0;
    function UUID(){
        return uuid++;
    }

    var frames = [];


    //class primitive
    //turn the references around?
    function Frame(parent){
        var transactions = [];
        if(parent===undefined){
            this.leaf = new Transaction(undefined, UUID(), "O");
            this.root = this.leaf;
        } else {
            this.leaf = parent.leaf;
            this.root = parent.root;
        }



        this.transact = function(op, value){
            var t = new Transaction(this.leaf, UUID(), op, value);
            transactions.push(t);
            this.leaf = t;
        };

        this.branch = function(){
            return new Frame(this);
        };

        this.log = function(){
            var stack = [];

            function push(t){
                if(t.root) {
                    stack.unshift(t);
                    push(t.root);
                }
            }

            push(this.leaf);

            console.log(stack);
        };

        frames.push(this);
    }

    function Transaction(root, op, tid, value){
        this.root = root;
        this.operation = op;
        this.tid = tid;
        this.value = value;
        this.date = new Date();
    }

    //public interface
    var iface = {};

    iface.createFrame = function(parent){
        return new Frame(parent);
    };

    return iface;

})();

var frame = FrameStack.createFrame();
frame.transact("CN","Apple");
frame.transact("UN", "Pear");
var frameb = frame.branch();
frameb.transact("UN", "Citrus");

frameb.log();
