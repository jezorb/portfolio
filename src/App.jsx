import { useState } from "react";
import LoadingPage from "./component/LoadingPage";
import Layout from "./component/Layout";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="font-mono">
      {loading && (
        <LoadingPage onComplete={() => setLoading(false)} />
      )}

      {!loading && <Layout />}
    </div>
  );
};

export default App;