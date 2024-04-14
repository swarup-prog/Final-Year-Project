import React from "react";

const Reports = () => {
  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="text-xl text-accent font-semibold">Reports</div>
      </section>
      <div className="divider divider-accent"></div>
      <section>
        <div className="flex flex-col justify-center items-center gap-8 mt-20">
          <span className="text-center">There are no reports by the user.</span>
        </div>
      </section>
    </div>
  );
};

export default Reports;
