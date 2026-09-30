import { useEffect } from 'react';

export function usePositionTracker(totalItems, setOrbitCenter, setRadius, setDockSlots, slotRefs) {
  useEffect(() => {
    const updatePositions = () => {
      const el = document.getElementById('hero-portrait');
      if (el) {
        const rect = el.getBoundingClientRect();
        setOrbitCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      } else {
        setOrbitCenter({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        });
      }

      if (window.innerWidth < 640) setRadius(165);
      else if (window.innerWidth < 1024) setRadius(210);
      else setRadius(245);

      const measured = [];
      slotRefs.current.forEach((node) => {
        if (node) {
          const r = node.getBoundingClientRect();
          measured.push({
            x: r.left + r.width / 2,
            y: r.top + r.height / 2
          });
        }
      });
      if (measured.length === totalItems) {
        setDockSlots(measured);
      }
    };

    updatePositions();
    const timer = setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePositions);
    };
  }, [totalItems, setOrbitCenter, setRadius, setDockSlots, slotRefs]);
}
