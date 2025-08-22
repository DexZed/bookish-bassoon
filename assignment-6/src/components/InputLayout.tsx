type Props = {
  description?: string;
  errorDescription?: string;
  children: React.ReactNode;
};

function InputLayout({ description, errorDescription, children }: Props) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{description}</legend>
      {children}
      <p className="label">{errorDescription}</p>
    </fieldset>
  );
}

export default InputLayout;
