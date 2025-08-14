export default function PageTitle({ children, className }) {
    return <div className={`md:text-[20px] text-[16px] text-[#fefefe] font-medium lowercase leading-relaxed ${className}`}>{children}</div>;
}
