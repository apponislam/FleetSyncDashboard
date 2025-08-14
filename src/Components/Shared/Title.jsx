const Title = ({ children, className }) => {
  return (
    <h1 className={`text-xl !font-bold text-[#0B3666]  ${className}`}>
      {children}
    </h1>
  );
};

export default Title;
