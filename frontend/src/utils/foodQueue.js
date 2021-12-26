/** Queue: a linked-list data structure used to represent feeding patterns.
 * 
 * A simple queue used to cycle through frequencies to determine what to feed your reptile.
 * 
 * Takes the frequency at the head and returns it to the back once we're done.
 * 
 * Also used to determine what treats to serve.
*/

// Node class to be used for the queue
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  };
};

// Queue class. A line of frequencies to determine what to feed reptile
class Queue {
  constructor(vals) {
    this.first = null;
    this.last = null;

    for (let val of vals) this.enqueue(val)
  };

  // enqueue(val): add to end of queue. Returns undefined.
  enqueue(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    };
  };

  // dequeue(): remove from beginning of queue. Returns val.
  dequeue() {
    const val = this.first.val;
    this.first = this.first.next;
    return val;
  };
};

// foodQueue: Feed reptile based on frequency
const foodQueue = new Queue(["often", "often", "moderately", "often", "often", "moderately", "often", "often", "moderately", "occasionally"]);

// treatQueue: Give reptile treats based on frequency
const treatQueue = new Queue(["moderately", "moderately", "occasionally"]);

export { foodQueue, treatQueue };