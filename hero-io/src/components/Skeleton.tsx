

type Props = {};

function Skeleton({}: Props) {
  return (
    <>
      <section className="min-h-screen flex-centered-y"><span className="font-bold text-6xl skeleton skeleton-text">Loading...</span></section>
      
    </>
  );
}

export default Skeleton;
