import React, { useState, useCallback, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";

let interval;
const DataReloader = React.memo((props) => {
  const [value, updateValue] = useState(100);
  console.debug("DataReloader redering......................................");
  useEffect(() => {
    autoReload();
    return () => {
      clearInterval(interval);
    }
  });

  const autoReload = useCallback(async () => {
    try {
      interval = setInterval(() => {
        updateValue((oldValue) => {
          const newValue = oldValue - 0.83;
          if (newValue <= 0) {
            console.debug("DataReloader timer stop......................................");
            clearInterval(interval);
            props.getData();
            return 100;            
          }
          return newValue;
        });
      }, 500);
    } catch (error) {
      console.error("Dashboard", "getData", error);
    }
  }, []);

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <ProgressBar variant="gradient-danger" now={value} />
      </div>
    </div>
  );
});

export default DataReloader;
