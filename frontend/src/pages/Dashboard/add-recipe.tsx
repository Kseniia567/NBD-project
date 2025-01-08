import {useNavigate} from "react-router-dom";
import {useRecipe} from "../../hooks";
import {FormEvent, useState, DragEvent} from "react";
import {Button, Form, Input} from "../../components";
import {TextArea} from "../../components/textarea";
import {ImageUploader} from "./Common";
import {validateImageType} from "../../utils";
import cogoToast from "cogo-toast";

export const AddRecipe = () => {
    const navigate = useNavigate();
    const { loading, addRecipe } = useRecipe();

    // State to handle form data
    const [state, setState] = useState({
        title: "",
        note: "",
        description: "",
        ingredients: "",
    });

    // State for image and errors
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        let imageFile = event.dataTransfer.files[0];

        if (!validateImageType(imageFile)) {
            return cogoToast.error("File type is wrong: " + imageFile.type);
        }

        setImage(imageFile);
    };

    const handleFile = (event: FormEvent<HTMLInputElement>) => {
        if (!event.currentTarget.files) return;
        const imageFile = event.currentTarget.files[0];
        if (!validateImageType(imageFile)) {
            return cogoToast.warn("File type is wrong: " + imageFile.type);
        }

        setImage(imageFile);
    };

    const validateForm = () => {
        let formErrors: { [key: string]: string } = {};

        if (!state.title) formErrors.title = "Title is required";
        if (!state.ingredients) formErrors.ingredients = "Ingredients are required";
        if (!state.description) formErrors.description = "Description is required";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate before submitting
        if (!validateForm()) return;

        if (!image) {
            return cogoToast.error("Please add an image");
        }

        const payload = {
            image,
            ...state,
        };

        try {
            await addRecipe(payload);
            setState({ title: "", note: "", description: "", ingredients: "" });
            setImage(null);
            navigate("/dashboard/myrecipes");
        } catch (error) {
            cogoToast.error("An error occurred while submitting the recipe");
        }
    };

    const onChange = (
        e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;
        setState({ ...state, [name]: value });
    };

    return (
        <div className="text-white">
            <h2 className="font-extrabold text-xl">Add a recipe</h2>

            <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-3 md:flex-row">
                <div className="w-full">
                    <Input
                        disabled={loading}
                        name="title"
                        placeholder="Name of the recipe"
                        type="text"
                        handleChange={onChange}
                        className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none ${errors.title ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

                    <TextArea
                        disabled={loading}
                        name="ingredients"
                        placeholder="Ingredients"
                        onChange={onChange}
                        rows={4}
                        className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2 ${errors.ingredients ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}

                    <TextArea
                        disabled={loading}
                        name="description"
                        placeholder="Recipe description and how to make it"
                        onChange={onChange}
                        rows={6}
                        className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none ${errors.description ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <ImageUploader
                        handleDragOver={handleOnDragOver}
                        handleOnDrop={handleOnDrop}
                        handleFile={handleFile}
                        name={image?.name as string}
                        className="bg-zinc-900 py-1 px-4 w-full hover:bg-zinc-800 cursor-pointer focus:outline-none"
                    />
                    <TextArea
                        disabled={loading}
                        name="note"
                        placeholder="Notes"
                        onChange={onChange}
                        rows={4}
                        className="bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none"
                    />
                    <Button
                        disabled={loading}
                        title={loading ? "Publishing..." : "Publish Recipe"}
                        className="bg-orange-500 text-white hover:bg-orange-600 py-1 px-6 w-full mb-4"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};