import motion, { useScroll, useTransform } from 'motion/react';
import {
  useMountEffect,
  useEventListener,
  useUnmountEffect,
  useWindowSize,
} from '@react-hookz/web';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import FlutterText from './flutterText';
import { useNavShowing } from '~/contexts/NavShowingProvider';
import { ContentfulCenteredImage } from '../shared';
import { PAGE_TRANSITION_DELAY } from '~/contexts/PageTransitionProvider';

type HomeVideoHeroProps = {
  fields: SpecificLocaleFields<IHomeVideoHeroFields>;
};

const TextBox = ({
  fields,
  className = '',
  show = true,
}: {
  fields: SpecificLocaleFields<IHomeVideoHeroFields>;
  className?: string;
  show?: boolean;
}) => (
  <div
    className={clsx(
      className,
      'absolute inset-0 flex h-full w-full flex-col justify-center',
    )}
  >
    <div className="flex w-full flex-col items-center justify-center">
      <p className="eyebrows col-span-full mb-6 text-center lg:col-span-4 lg:col-start-5">
        {fields.eyebrow}
      </p>
      {show && (
        <FlutterText
          text={fields.title}
          className="h1 col-span-full max-w-[1000px] text-center lg:col-span-8 lg:col-start-3"
        />
      )}
    </div>
  </div>
);

export default function HomeVideoHero({ fields }: HomeVideoHeroProps) {
  const { setNavLocked } = useNavShowing();
  const { height } = useWindowSize();
  const { scrollYProgress } = useScroll();
  const clipTransform = useTransform(scrollYProgress, (v: number) => {
    const left = Math.max(49.5 - v * 300, 0);
    const right = Math.min(100 - left, 100);
    // math.min and Math.max
    return `polygon(0% 0%, 0% 100%, ${left}% 100%, ${left}% 0%, ${right}% 0%, ${right}% 100%, ${left}% 100%, ${left}% 100%, 100% 100%, 100% 0%)`;
  });
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroRef = useRef<HTMLDivElement>(null);
  const [stickyNav, setStickNav] = useState(false);

  const onScroll = () => {
    if (heroRef.current) {
      const { bottom } = heroRef.current.getBoundingClientRect();

      // keep nav bar here until bottom

      if (bottom <= height && !stickyNav) {
        setNavLocked(false);
        setStickNav(true);
      } else if (bottom >= height && stickyNav) {
        setNavLocked(true);
        setStickNav(false);
      }
    }
  };

  useEventListener(window, 'scroll', onScroll);
  useMountEffect(onScroll);

  const [showText, setShowText] = useState(false);
  useMountEffect(() => {
    // Set this off a little before the welcome transition is done so that it's active for the reveal
    setTimeout(() => setShowText(true), PAGE_TRANSITION_DELAY - 900);
  });

  const scrollToContent = () => {
    window.scrollTo({
      // height of hero plus mobile nav
      top: height * 2.5 + 80,
      behavior: 'smooth',
    });
  };

  useUnmountEffect(() => setNavLocked(false));

  return (
    <section className="relative mx-auto h-full w-screen">
      <div
        className={clsx('left-[36px] flex h-screen w-[calc(100vw-72px)]', {
          'fixed top-0': !stickyNav,
          'absolute bottom-0': stickyNav,
        })}
      >
        {/* // height is screen minus nav minus space for bottom explore eyebrow */}
        <div className="absolute inset-0 top-mobile-nav flex h-[calc(100vh-80px-44px)] w-full justify-center lg:top-desktop-nav lg:h-[calc(100vh-96px-44px)]">
          <TextBox className="z-10 text-white" fields={fields} />
          <div className="absolute inset-0 flex h-full w-full flex-col justify-center overflow-hidden text-white">
            {fields.mobileVideo ? (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden lg:hidden">
                <video
                  id="video"
                  className="absolute top-0 h-auto min-h-[80vh] w-full"
                  playsInline
                  autoPlay
                  muted
                  loop
                >
                  <source src={fields.mobileVideo.fields?.file?.url} />
                  <img
                    src={fields.fallbackImage.fields.image?.fields?.file?.url}
                    title="Your browser does not support the <video> tag"
                    alt={fields.fallbackImage.fields.alt}
                  />
                  <track
                    src="/noCaptions.vtt"
                    kind="captions"
                    srcLang="en"
                    label="english captions"
                  />
                  Unsupported video.
                </video>
              </div>
            ) : (
              <ContentfulCenteredImage
                className="absolute inset-0 h-full w-full lg:hidden"
                image={fields.fallbackImage.fields}
              />
            )}
            <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden lgmax:hidden">
              <video
                id="video"
                className="absolute top-0 h-auto min-h-[80vh] w-full"
                autoPlay
                muted
                loop
              >
                <source src={fields.video.fields?.file?.url} />
                <img
                  src={fields.fallbackImage.fields.image?.fields?.file?.url}
                  title="Your browser does not support the <video> tag"
                  alt={fields.fallbackImage.fields.alt}
                />
                <track
                  src="/noCaptions.vtt"
                  kind="captions"
                  srcLang="en"
                  label="english captions"
                />
                Unsupported video.
              </video>
            </div>
          </div>

          <motion.div
            className="absolute inset-0 left-[-1%] z-10 flex h-full w-[102%] bg-white"
            style={{
              clipPath: clipTransform,
              WebkitClipPath: clipTransform,
            }}
          >
            <TextBox show={showText} fields={fields} />
          </motion.div>
        </div>
      </div>
      <div
        className={clsx(
          'bottom-3 z-10 col-span-full flex w-full items-center justify-center',
          {
            fixed: !stickyNav,
            absolute: stickyNav,
          },
        )}
      >
        <motion.button
          className={clsx({
            'min-w-max': true,
            'text-14': true,
            uppercase: true,
          })}
          style={{
            opacity: opacityTransform,
          }}
          onClick={scrollToContent}
          whileHover="hover"
          whileInView="noHover"
        >
          Explore
          <motion.div
            className="flex border-b border-solid border-black content-['']"
            variants={{
              hover: {
                transform: 'scaleX(1)',
              },
              noHover: {
                transform: 'scaleX(0)',
              },
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          />
        </motion.button>
      </div>

      <div
        ref={heroRef}
        className="relative flex h-[200vh] w-full items-center justify-center lg:h-[250vh]"
      ></div>
    </section>
  );
}
