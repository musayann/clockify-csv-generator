
type InputType = {
    id?: string;
    label?: string,
    name: string,
    type?: string,
    placeholder?: string,
    autoComplete?: string,
    value: string;
    onChange?: (e?: any) => any | void;
};

export const Input = ({ id, label, name, type = 'text', placeholder, autoComplete, onChange }: InputType) => {
    return (
        <div className="relative block">
            {label && (<label htmlFor={id || name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>)}
            <input
                type={type}
                name={name}
                id={id || name}
                placeholder={placeholder}
                autoComplete={autoComplete || name}
                onChange={onChange}
                className="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full  sm:text-sm "
            />
        </div>
    )
}