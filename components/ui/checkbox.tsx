

type CheckBoxProps = {
    id?: string;
    children?: any;
    label?: string;
    name: string;
    checked: boolean;
    onChange: (e?: any) => any | void;
};

const CheckBox = ({ id, children, label, name, checked, onChange }: CheckBoxProps) => {
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    id={id || name}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
            </div>
            <div className="ml-3 text-sm">
                {label && (<label htmlFor={id || name} className="font-medium text-gray-700">{label}</label>)}
                <div className="text-gray-500">{children}</div>
            </div>
        </div>);
};

export default CheckBox;