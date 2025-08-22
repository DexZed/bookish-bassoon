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
      {errorDescription && <p className="label text-amber-500">{errorDescription}</p>}
    </fieldset>
  );
}

export default InputLayout;
