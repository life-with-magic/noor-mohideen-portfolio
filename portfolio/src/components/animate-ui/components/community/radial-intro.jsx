import * as React from 'react';
import {
  LayoutGroup,
  motion,
  useAnimate,
  delay
} from 'framer-motion';

const transition = {
  delay: 0,
  stiffness: 300,
  damping: 35,
  type: 'spring',
  restSpeed: 0.01,
  restDelta: 0.01,
};

const spinConfig = {
  duration: 30,
  ease: 'linear',
  repeat: Infinity,
};

const qsa = (root, sel) =>
  Array.from(root.querySelectorAll(sel));

const angleOf = (el) => Number(el.dataset.angle || 0);

const armOfImg = (img) =>
  img.closest('[data-arm]');

export function RadialIntro({
  orbitItems = [],
  stageSize = 320,
  imageSize = 60,
  centerContent = null,
  onItemClick,
  className = ''
}) {
  const step = orbitItems.length > 0 ? 360 / orbitItems.length : 60;
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    // get arm and image elements
    const arms = qsa(root, '[data-arm]');
    const imgs = qsa(root, '[data-arm-image]');
    const stops = [];

    // image lift-in from center outward
    delay(() => animate(imgs, { top: 0 }, transition), 250);

    // build sequence for orbit placement
    const orbitPlacementSequence = [
      ...arms.map((el) => [
        el,
        { rotate: angleOf(el) },
        { ...transition, at: 0 },
      ]),
      ...imgs.map((img) => [
        img,
        { rotate: -angleOf(armOfImg(img)), opacity: 1 },
        { ...transition, at: 0 },
      ]),
    ];

    // play placement sequence
    delay(() => animate(orbitPlacementSequence), 700);

    // start continuous spin for arms and images
    delay(() => {
      // arms spin clockwise
      arms.forEach((el) => {
        const angle = angleOf(el);
        const ctrl = animate(el, { rotate: [angle, angle + 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });

      // images counter-spin to stay upright
      imgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const ctrl = animate(
          img,
          { rotate: [-angle, -angle - 360] },
          spinConfig,
        );
        stops.push(() => ctrl.cancel());
      });
    }, 1300);

    return () => stops.forEach((stop) => stop());
  }, [orbitItems.length]);

  return (
    <LayoutGroup>
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Optional Center Content (e.g. Profile photo) */}
        {centerContent && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
            {centerContent}
          </div>
        )}

        <motion.div
          ref={scope}
          className="relative overflow-visible"
          style={{ width: stageSize, height: stageSize }}
          initial={false}
        >
          {orbitItems.map((item, i) => (
            <motion.div
              key={item.id}
              data-arm
              className="will-change-transform absolute inset-0 pointer-events-none"
              style={{ zIndex: orbitItems.length - i }}
              data-angle={i * step}
              layoutId={`arm-${item.id}`}
            >
              <div
                data-arm-image
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                onClick={() => onItemClick?.(item)}
              >
                {item.src ? (
                  <motion.img
                    className="rounded-full object-cover aspect-square shadow-lg"
                    style={{
                      width: imageSize,
                      height: imageSize,
                      opacity: i === 0 ? 1 : 0,
                    }}
                    src={item.src}
                    alt={item.name}
                    draggable={false}
                    layoutId={`arm-img-${item.id}`}
                  />
                ) : item.render ? (
                  item.render(item, i)
                ) : (
                  <div
                    className="rounded-full bg-neutral-900 border border-white/20 p-2 text-xs font-mono text-white"
                    style={{ width: imageSize, height: imageSize }}
                  >
                    {item.name}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </LayoutGroup>
  );
}

export default RadialIntro;
