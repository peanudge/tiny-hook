const MyReact = (function () {
  //   let _val, _deps;
  let hooks = [],
    currentHook = 0;
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      currentHook = 0;
      return Comp;
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue;
      const setStateHookIndex = currentHook; // for setState's closure!
      const setState = (newState) => (hooks[setStateHookIndex] = newState);

      return [hooks[currentHook++], setState];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[currentHook];
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;

      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++;
    },
  };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(0);
  const [text, setText] = MyReact.useState("foo");
  MyReact.useEffect(() => {
    console.log("effect", count, text);
  }, [count, text]);
  return {
    click: () => setCount(count + 1),
    type: (txt) => setText(txt),
    noop: () => setCount(count),
    render: () => {
      console.log("render: ", { count, text });
    },
  };
}

let App;
App = MyReact.render(Counter);
App.click();
App = MyReact.render(Counter);
App.type("bar");
App = MyReact.render(Counter);

App.noop();
App = MyReact.render(Counter);
App.click();
App = MyReact.render(Counter);
