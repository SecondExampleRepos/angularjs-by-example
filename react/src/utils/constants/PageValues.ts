// Define a TypeScript type for PageValues
type PageValuesType = {
    title: string | null;
    description: string | null;
    loading: boolean;
};

// Create a constant for PageValues
export const PageValues: PageValuesType = {
    title: null,
    description: null,
    loading: false
};
