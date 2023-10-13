export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}