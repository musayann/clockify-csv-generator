import { ReactNode, useState } from "react"

export const Accordion = ({ children }: { children: ReactNode }) => {

    const [open, setOpen] = useState(false)
    const animationClass = "transition-all duration-300 ease-in-out";

    return (<div>
        <h2 id="accordion-color-heading-1">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex items-center justify-between w-full p-5 font-medium text-left text-sm border border-gray-200 rounded-t-xl hover:border-gray-300 hover:bg-gray-100 ${animationClass} ${open ? 'border-b-0 rounded-b-none' : 'rounded-b-xl'}`}
            >
                <span>Customize the details?</span>
                <svg
                    className={`w-6 h-6 shrink-0 ${open && 'rotate-180'} ${animationClass}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
        </h2>
        <div
        >
            <div className={`p-5 border border-gray-200 rounded-b-xl ${!open && 'hidden'} ${animationClass}`}>
                <div className="flex flex-col gap-y-3">
                    {children}
                </div>
            </div>
        </div>
    </div>)
}