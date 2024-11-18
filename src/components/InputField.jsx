const InputField = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    className = '',
    labelClassName = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full p-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-slate-500 ${className}`}
                {...props}
            />
        </div>
    );
};

export default InputField;