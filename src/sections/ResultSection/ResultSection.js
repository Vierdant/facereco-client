import React from 'react';
import Models from '../../models/Models';

import './ResultSection.css';

class ResultSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid,
            imageURL: props.imageURL,
            model: props.model,
            result: props.result,
            profile: props.profile,
            processedResult: {}
        }
    }

    onProcessRequest = () => {
        const bounding = Models[this.state.model].processBoundingDisplay(this.state);
        if (bounding) {
            this.setState({processedResult: bounding});
        }
    }

    render() {
        return (
            <div>
                {Models[this.state.model].getDisplay(this.state, this.onProcessRequest)}
                {Models[this.state.model].getFooterSection(this.state)}
            </div>
        );
    }
}

export default ResultSection;