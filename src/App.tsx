import { FC, useRef, useState } from "react";
import "./App.css";
import { useQuery } from "./cache/hooks";
import { api } from "../convex/_generated/api";

function App() {
  const [count, setCount] = useState(10);
  const ref = useRef<HTMLInputElement>(null);
  const children = [];
  const updateCount = () => {
    const r = parseInt(ref.current!.value);
    if (!isNaN(r)) {
      setCount(Math.floor(r));
    }
    return false;
  };
  for (let i = 0; i < count; i++) {
    children.push(<Added key={i} top={i + 1} />);
    if (count % 2 == 1) {
      children.push(<Added key={i + count} top={i + 1} />);
    }
  }
  return (
    <>
      <input ref={ref} type="text" onBlur={updateCount} />
      <ul>{children}</ul>
    </>
  );
}

const Added: FC<{ top: number }> = ({ top }) => {
  const sum = useQuery(api.addIt.addItUp, { top });
  if (sum === undefined) {
    return <li>Loading {top}...</li>;
  } else {
    return (
      <li>
        {top} &rarr; {sum}
      </li>
    );
  }
};

export default App;
