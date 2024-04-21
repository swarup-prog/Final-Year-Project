const Community = () => {
  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="text-xl text-secondary font-semibold">
          Your Communities
        </div>
      </section>
      <div className="divider divider-accent"></div>
      <section>
        <div className="flex flex-col justify-center items-center gap-8 mt-20">
          <span className="text-center">
            You haven't joined any communities.
          </span>
        </div>
      </section>
    </div>
  );
};

export default Community;
