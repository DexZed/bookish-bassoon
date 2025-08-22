type Props = {
  description?: string;
  errorDescription?: string;
  children: React.ReactNode;
};

function SelectorLayout({ description, errorDescription, children }: Props) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{description}</legend>
      {children}
      <span className="label text-amber-500">{errorDescription}</span>
    </fieldset>
  );
}

export default SelectorLayout;
