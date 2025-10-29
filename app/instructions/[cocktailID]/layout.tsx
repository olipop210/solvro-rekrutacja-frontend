import { Suspense } from "react";
import Loading from "./loading";

const CocktailLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mx-auto p-4">
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </div>
    );
}

export default CocktailLayout;