import useLockBodyScroll from "@/utils/useLockBodyScroll";

type PreventBodyScrollProps = {
  enabled?: boolean;
};

/**
 * WARNING: Unwanted behavior may occur if this is used multiple times
 * on the page. We may be able to solve this with some global context that
 * manages the multiple uses.
 */
export function usePreventBodyScroll({ enabled }: PreventBodyScrollProps) {
  useLockBodyScroll(enabled);
}

export function PreventBodyScroll(props: PreventBodyScrollProps) {
  usePreventBodyScroll(props);
  return null;
}
