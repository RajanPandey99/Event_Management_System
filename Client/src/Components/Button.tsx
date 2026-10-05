interface ButtonProps<T> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (value?: T) => void;
  className?: string;
}

export const Button = <T,>({
  children,
  type = "button",

  onClick,
  className = "",
}: ButtonProps<T>) => {
  return (
    <button
      type={type}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={`mx-auto h-7 w-30 rounded-lg! bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};
