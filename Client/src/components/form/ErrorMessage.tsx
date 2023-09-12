import { ExclamationMarkIcon } from "../../assets/icons/Icons";

interface ErrorMessageProps {
    msg: string
}
const ErrorMessage = ({ msg }: ErrorMessageProps) => {
    return (
      msg && (
        <div
          className={`w-full bg-red-warning/10 p-2 rounded-md flex items-center gap-2  
          animation-bounce`}
        >
          <ExclamationMarkIcon className="h-[25px] fill-red-warning" />
          <p className="text-red-warning font-medium">{msg}</p>
        </div>
      )
    );
  };
export default ErrorMessage;