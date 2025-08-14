const CloseAccount = () => {
  return (
    <div className="w-[90%] lg:w-[50%] h-[100dvh] flex flex-col items-center justify-center mx-auto text-center">
      <h1 className="font-bold text-[30px]">Close Account</h1>
      <p className="text-secondaryDark font-400">Close your account permanently.</p>
      <h4 className="font-medium m-4 lg:text-[17px]">
        <span className="text-danger text-[24px]">Warning:</span> If you close your account, you will be
        unsubscribed from all 3 of your courses and will lose access to your
        account and data associated with your account forever, even if you
        choose to create a new account using the same email address in the
        future.
      </h4>
      <h4 className="font-medium lg:text-[17px] w-[80%] mx-auto my-4">
        Please note, if you want to reinstate your account after submitting a
        deletion request, you will have 14 days after the initial submission
        date to reach out to privacy@udemy.com to cancel this request.
      </h4>
    </div>
  );
};
export default CloseAccount;
