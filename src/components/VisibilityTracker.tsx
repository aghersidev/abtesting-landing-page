// src/components/VisibilityTracker.js
import { useRef } from 'react';
import { useTrackVisibility } from '../hooks/useTrackVisibility';

const VisibilityTracker = ({ children, eventName }) => {
  const ref = useRef(null);

  useTrackVisibility(ref, eventName);

  return <div ref={ref}>{children}</div>;
};

export default VisibilityTracker;