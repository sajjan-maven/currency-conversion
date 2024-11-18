const Button = ({
    onClick,
    children = 'Button',
    isLoading = false,
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`px-5 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 
                focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 
                w-full ${isLoading ? 'animate-pulse' : ''} 
                ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;