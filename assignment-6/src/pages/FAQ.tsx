function FAQ() {
  return (
    <>
      <section className="h-dvh flex justify-center items-center flex-col gap-4">
        <h1 className="text-3xl font-bold ">Frequently Asked Questions</h1>
        <div className="join join-vertical bg-base-100">
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold">
              How do I create an account?
            </div>
            <div className="collapse-content text-sm">
              Click the "Register" button in the navbar and fill out the necessary details
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              Is this platform free to use?
            </div>
            <div className="collapse-content text-sm">
              Yes , it is mostly free to use. But if you have in need of services that we dont provide 
              , we can help you at a very generous price.
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              What if i want to switch to a different service?
            </div>
            <div className="collapse-content text-sm">
              We also streamline that process, allowing to transfer your data to your preferred service.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQ;
