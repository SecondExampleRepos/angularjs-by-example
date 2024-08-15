// Derived from src/sections/view/view.ctrl.js

export interface PageValues {
    title: string;
    description: string;
}

export interface Show {
    original_name: string;
    id: number;
    cast: CastMember[];
}

export interface CastMember {
    // Define properties of a cast member if known
}

export interface ViewModel {
    show: Show;
    setBannerImage: () => BannerImageStyle;
}

export interface BannerImageStyle {
    background: string;
    'background-size': string;
    'background-position': string;
}

export interface ShowService {
    getCast: (showId: number) => Promise<CastResponse>;
}

export interface CastResponse {
    cast: CastMember[];
}
