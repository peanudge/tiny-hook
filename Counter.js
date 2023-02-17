function useState(initialValue) {
  var _val = initialValue; // _val is a local variable created by useState
  function state() {
    // state is an inner function, a closure
    return _val; // state() uses _val, declared by parent funciton
  }
  function setState(newVal) {
    // same
    _val = newVal; // setting _val without exposing _val
  }
  return [state, setState]; // exposing functions for external use
}

function Counter() {
  const [count, setCount] = useState(0);
  return {
    click: () => setCount(count() + 1),
    render: () => console.log("render: ", { count: count() }),
  };
}

const C = Counter();
C.render();
C.click();
C.render();
