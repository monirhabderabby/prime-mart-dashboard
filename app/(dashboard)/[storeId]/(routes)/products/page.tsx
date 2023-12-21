import prismaDb from "@/lib/prismaDb";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import ProductClient from "./components/client";
import { ProductColumn } from "./components/column";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
    const products = await prismaDb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
    });

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(Number(item.price)),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    );
};

export default ProductsPage;
