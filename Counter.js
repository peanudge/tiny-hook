// Stale Cloure
function useState(initialValue) {
  var _val = initialValue; // _val is a local variable created by useState

  function setState(newVal) {
    // same
    _val = newVal; // setting _val without exposing _val
  }
  return [_val, setState]; // exposing functions for external use
}

function Counter() {
  const [count, setCount] = useState(0);
  return {
    click: () => setCount(count + 1),
    render: () => console.log("render: ", { count }),
  };
}

const C = Counter();
C.render();
C.click();
C.render();
