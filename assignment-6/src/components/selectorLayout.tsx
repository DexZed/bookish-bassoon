type Props = {
  description?: string;
  errorDescription?: string;
  children: React.ReactNode;
};

function selectorLayout({ description, errorDescription, children }: Props) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{description}</legend>
      {children}
      <span className="label">{errorDescription}</span>
    </fieldset>
  );
}

export default selectorLayout;
