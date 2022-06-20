
type ButtonProps = {
    id?: string;
    children: any;
    type?: 'submit' | 'button' | 'reset';
    onClick?: (e?: any) => any;
    className?: string;
    disabled?: boolean;
}

const Button = ({ id, children, type = 'button', onClick, className, disabled }: ButtonProps) => {
    return (<button
        id={id}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${className} inline-flex justify-center disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-75 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer`}
    >
        {children}
    </button>)
}

export default Button;