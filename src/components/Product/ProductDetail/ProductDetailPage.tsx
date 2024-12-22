import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getProductById } from "@/apis/product";
import { Breadcrumb } from "@/components/Common";
import { Layout } from "@/components/Layout";

import ProductInfo from "./ProductInfo";
import ProductView from "./ProductView";
import RelatedProduct from "./RelatedProduct";

const ProductDetailPage = () => {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ["getProductById", params.id],
    queryFn: () => {
      return getProductById(params.id || "");
    },
  });

  return (
    <Layout>
      <div className="flex p-5 bg-teal-400 items-center font-bold">
        <Breadcrumb />
      </div>
      <div className="flex p-10 gap-10">
        <div className="flex-1">
          <ProductView images={data?.images || []} />
        </div>
        <div className="flex-1">
          <ProductInfo product={data || null} />
        </div>
      </div>
      {/* <div className="px-10">
        <ContentTab />
      </div> */}
      <div className="flex flex-col gap-2 p-10">
        <h3 className="font-bold text-lg text-center">Related Products</h3>
        <RelatedProduct category={data?.category || null} />
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
