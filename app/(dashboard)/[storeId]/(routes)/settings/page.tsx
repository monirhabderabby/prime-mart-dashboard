import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // finding store infor via store id
    const store = await prismaDb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        },
    });

    if (!store) {
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
};

export default SettingsPage;
