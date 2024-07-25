// Define the type for PageValues
type PageValuesType = {
    title: string | null;
    description: string | null;
    loading: boolean;
};

// Create the PageValues constant
const PageValues: PageValuesType = {
    title: null,
    description: null,
    loading: false
};

export default PageValues;
