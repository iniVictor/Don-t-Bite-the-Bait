// Helper function to get asset URL with base path
export const getAssetUrl = (path) => {
    return new URL(path, import.meta.url).href;
};
