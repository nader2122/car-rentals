import { useState } from 'react';
import RiseLoader from 'react-spinners/RiseLoader';

const Loader = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{ marginTop: '150px' }}>
      <div className="sweet-loading text-center">
        <RiseLoader
          color="#505050"
          Loading={loading}
          size={50}
          onChange={(e) => setLoading(e.target.Loading)}
        />
      </div>
    </div>
  );
};

export default Loader;
