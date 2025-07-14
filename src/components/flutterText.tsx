import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useInView,
} from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export type FlutterTextProps = {
  text: string;
  uniqKey?: string;
  cycleOut?: boolean;
  once?: boolean;
};

export default function FlutterText({
  text,
  cycleOut = false,
  once = false,
  ...otherProps
}: FlutterTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const letters = useMemo(
    () =>
      text
        .trim()
        .split("")
        .map((letter) => ({
          letter,
          key: uuidv4(),
        })),
    [text]
  );

  const controls = useAnimationControls();
  useEffect(() => {
    const sequence = async () => {
      if (isInView) {
        await controls.start(() => ({
          opacity: 1,
          transition: {
            duration: Math.random() / 2,
            delay: Math.random() / 2,
          },
        }));
        if (cycleOut) {
          return await controls.start(() => ({
            opacity: 0,
            transition: {
              duration: Math.random() / 2,
              delay: Math.random() / 2 + 1,
            },
          }));
        } else {
          return await controls.start(() => ({
            opacity: 0,
          }));
        }
      }
    };

    if (cycleOut) {
      sequence();
    }
  }, [controls, isInView, cycleOut]);

  if (cycleOut) {
    return (
      <div {...otherProps} ref={ref}>
        {letters.map(({ letter, key }, ix) => (
          <AnimatePresence key={key}>
            <motion.span
              key={key}
              initial={{
                opacity: 0,
              }}
              animate={controls}
              custom={ix}
            >
              {letter}
            </motion.span>
          </AnimatePresence>
        ))}
      </div>
    );
  }
  return (
    <div {...otherProps} ref={ref}>
      {letters.map(({ letter, key }) => (
        <motion.span
          key={key}
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            transition: {
              duration: Math.random() / 2,
              delay: Math.random() / 2,
            },
          }}
          viewport={{ once, amount: 0.8 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}
