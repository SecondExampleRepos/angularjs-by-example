import React from 'react';
import { PageValues } from '../utils/constants/PageValues';

interface BarControllerProps {}

interface BarControllerState {
    data: typeof PageValues;
}

class BarController extends React.Component<BarControllerProps, BarControllerState> {
    constructor(props: BarControllerProps) {
        super(props);
        this.state = {
            data: PageValues
        };
    }

    render() {
        return (
            <div>
                {/* Render the data or any other UI elements here */}
                <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
            </div>
        );
    }
}

export default BarController;
