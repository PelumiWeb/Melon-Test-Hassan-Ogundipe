import { useState } from "react";
import { endpoints } from "./lib/api/endpoints";
import { useApiQuery } from "./lib/api/useApi";

import ProductList from "./components/shared/ProductList";
import Header from "./components/shared/Header";

// import { useApiQuery } from "./lib/api/useApi";
// import { endpoints } from "./lib/api/endpoints";

// const products = [{ title: "Product Titile"}]

export type ProductFakerProps = {
  id: number;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
  variants?: [];
};

function App() {
  const [search, setSearch] = useState("");
  const [openVariantDialog, setOpenVariantDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const { data } = useApiQuery<any>(["products"], endpoints.getProduct);

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      {/* Header: Add Product + Search */}
      <Header
        openVariantDialog={openVariantDialog}
        setOpenVariantDialog={setOpenVariantDialog}
        setSearch={setSearch}
        search={search}
        setSelectedSize={setSelectedSize}
      />

      {/* Placeholder for Product Cards */}
      {data && <ProductList search={search} selectedSize={selectedSize} />}
    </div>
  );
}

export default App;
