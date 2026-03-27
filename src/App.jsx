import { useState } from "react";
import LoadingPage from "./component/LoadingPage";
import Layout from "./component/Layout";
import MaskWrapper from "./component/MaskWrapper";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="font-mono">
      {loading && (
        <LoadingPage onComplete={() => setLoading(false)} />
      )}

      {!loading && (
        <MaskWrapper>
          <Layout />
        </MaskWrapper>
      )}
    </div>
  );
};

export default App;