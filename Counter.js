const MyReact = (function () {
  let _val, _deps;
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      _val = _val || initialValue;
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const hasChangedDeps = _deps
        ? !depArray.every((el, i) => el === _deps[i])
        : true;

      if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
      }
    },
  };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(0);
  MyReact.useEffect(() => {
    console.log("effect", count);
  }, [count]);
  return {
    click: () => setCount(count + 1),
    noop: () => setCount(count),
    render: () => {
      console.log("render: ", { count });
    },
  };
}

let App;
App = MyReact.render(Counter);
App.click();
App = MyReact.render(Counter);
App.noop();
App = MyReact.render(Counter);
App.click();
App = MyReact.render(Counter);
