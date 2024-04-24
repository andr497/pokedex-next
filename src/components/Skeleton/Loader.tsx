import { ComponentPropsWithRef } from "react";

type DivProps = ComponentPropsWithRef<"div">;

// Define the component. this is basically a div wrapper with a pulse animation for the skeleton loading
const Loader: React.FC<DivProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={["animate-pulse", className].join(" ")} {...props}>
      {children}
    </div>
  );
};
export default Loader;