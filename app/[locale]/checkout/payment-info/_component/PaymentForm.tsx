const PaymentForm = ({
  paymentFormData,
}: {
  paymentFormData: {
    identifier: string;
    status: string;
    form: string;
    authority: string;
    created_at: string;
    modified_at: string;
  };
}) => {
  function createMarkup() {
    return {
      __html: paymentFormData?.form,
    };
  }
  if (paymentFormData)
    return (
      <div dir="ltr">
        <div id="iyzipay-checkout-form" className="responsive"></div>
        <div
          // key={`Math.random()${Math.random()}`}
          // id="my-script"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    );
};

export default PaymentForm;
