import {useParams} from "react-router-dom";
import {instance} from "../../config";
import useSWR from "swr";
import cogoToast from "cogo-toast";
import {UILoader} from "../../components/loaders";
import {Card} from "../../components";
import {Suspense} from "react";

export const More = () => {
    const params = useParams().id;
    const fetcher = (url: string) => instance.get(url).then((res) => res.data);
    const { data, error } = useSWR("/recipe/" + params, fetcher, {
        suspense: true,
    });

    if (error) {
        console.log(error);
        cogoToast.error(error?.response?.data?.error);
        return null;
    }

    return (
        <Suspense fallback={<UILoader />}>
            <div className="flex items-center justify-center m-auto">
                <Card
                    isFull={true}
                    id={data?._id}
                    title={data?.title}
                    image={data?.image?.url}
                    ingredients={data?.ingredients}
                    note={data?.note}
                    description={data?.description}
                    email={data?.user?.email}
                    avatar="https://www.shutterstock.com/image-vector/empty-photo-male-profile-gray-260nw-538707310.jpg"
                />
            </div>
        </Suspense>
    );
}