import {RecipeCard, SearchBox} from "../../components";
import {FormEvent, useState, Suspense} from "react";
import {IRECIPERESPONSE} from "../../@types";
import {NoRecipe} from "./Common";
import cogoToast from "cogo-toast";
import {instance} from "../../config";
import {useRecipe} from "../../hooks";
import useSWR from "swr";
import {SearchLoader, UILoader} from "../../components/loaders";


export const Home = () => {
    const { loading, searchRecipe } = useRecipe();
    //useswr fetcher
    const fetcher = (url: string) => instance.get(url).then((res) => res.data);
    const { data, error } = useSWR("/recipe", fetcher, { suspense: true });

    if (error) {
        console.log(error);
        cogoToast.error(error?.response?.data?.error);
        return null;
    }
    const [query, setQuery] = useState<string>("");
    const [state, setState] = useState<IRECIPERESPONSE[]>(
        (data as unknown as IRECIPERESPONSE[]) || []
    );
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!query) return;
        const result: IRECIPERESPONSE[] = await searchRecipe(query);
        if (result) {
            setState(result);
        }
    };
    const props = {
        title: "Recipes",
        onSearch: onSubmit,
        query,
        setQuery,
    };
    return (
        <Suspense fallback={<UILoader />}>
            <div className="text-white w-full h-full">
                <SearchBox {...props} />
                {loading ? (
                    <SearchLoader />
                ) : (
                    <>
                        {!!state?.length ? (
                            <div className="flex flex-wrap gap-3 flex-col items-center justify-center md:justify-start md:items-start md:flex-row w-full">
                                {state.map((recipe: IRECIPERESPONSE, index: number) => (
                                    <RecipeCard
                                        key={index + recipe._id}
                                        {...recipe}
                                        user={recipe?.user?.email as string}
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                <NoRecipe />
                            </>
                        )}
                    </>
                )}
            </div>
        </Suspense>
    );
};