
type FormProps = {
    id?: string;
    children: any;
    title: string;
    subtitle: string;
    footer?: any;
    onSubmit?: (e?: any) => any | void;
}

const Wrapper = ({ onSubmit, children }: { onSubmit?: (e?: any) => any | void, children: any }) => {
    if (!onSubmit) {
        return children;
    }
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
}

const Form = ({ id, children, title, subtitle, footer, onSubmit }: FormProps) => {
    return (<Wrapper onSubmit={onSubmit}>
        <div id={id} className='w-3/4 mx-auto py-20'>
            <div className="shadow overflow-hidden sm:rounded-md flex flex-col divide-y">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtitle}</p>
                </div>
                <div className="px-4 py-5 bg-white sm:p-6 flex flex-col space-y-4">
                    {children}</div>
                {footer && (<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    {footer}
                </div>)}
            </div>
        </div>
    </Wrapper>)
}
export default Form;