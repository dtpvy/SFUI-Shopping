import { SfButton } from "@storefront-ui/react";
import { IconCircleDashedCheck } from "@tabler/icons-react";

import { Layout } from "../Layout";

const ReviewPage = () => {
  return (
    <Layout>
      <div className="flex p-10 justify-center flex-wrap gap-6 bg-green-50 h-[500px] items-center">
        <IconCircleDashedCheck color="green" size={200} />
        <div className="flex flex-col justify-center items-start p-6 lg:p-10 max-w-1/2">
          <p className="uppercase typography-text-xs block font-bold tracking-widest">
            Order Successfully
          </p>
          <h2 className="mb-4 mt-2 font-bold typography-display-3">
            Please click the button to view order detail
          </h2>
          <SfButton>View order detail</SfButton>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewPage;
