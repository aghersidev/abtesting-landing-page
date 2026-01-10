
import { ReactNode, useRef } from 'react';
import { useTrackVisibility } from '../hooks/useTrackVisibility';

interface VisibilityTrackerProps {
  children: ReactNode;
  eventName: string;
}

const VisibilityTracker = ({ children, eventName }: VisibilityTrackerProps) => {  
  const ref = useRef<HTMLDivElement|null>(null);
  useTrackVisibility({ref, eventName});
  return <div ref={ref}>{children}</div>;
};

export default VisibilityTracker;