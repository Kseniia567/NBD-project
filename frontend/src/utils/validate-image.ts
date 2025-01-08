export const SUPPORT_FORMATS = [
    "image/jpg",
    "image/png",
    "image/jpeg",
    "image/JPG",
    "image/gif",
    "IMAGE/GIF",
    "image/PNG",
    "image/JPEG"
];


export const validateImageType = (value: File) => {
    if(value) {
        return SUPPORT_FORMATS.includes(value.type);
    }
};