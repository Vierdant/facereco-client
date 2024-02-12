import './styles/CelebrityFaceDetection.css'

import ResultDisplayTip from '../components/ResultDisplayTip/ResultDisplayTip';
import ModelFooter from '../sections/ModelFooter/ModelFooter';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';

const capilizeFirstLetters = (text) => {
    return text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

const celebrityfaceDetection = {
    getDisplay: (data, onProcessRequest) => {

        const names = [];

        if (data.processedResult.names) {
            data.processedResult.names.forEach((name) => {
                names.push(capilizeFirstLetters(name));

            })
        }

        return (
            <div className='celebrity-face-detection-container'>
                <div className='celebrity-face-detection-result'>
                    <ResultDisplayTip imageURL={data.imageURL} boundingBoxes={data.processedResult.boxes} tipContent={names} onProcessRequest={onProcessRequest} displayIndex={true} />
                </div>
                <div className='celebrity-face-detection-details'>
                    <h2>Results</h2>
                    <p>Celebrities found: {data.result.outputs[0].data.regions.length}</p>
                    <h3>List:</h3>
                    
                        {data.processedResult?.names?.map((name, i) => {
                            return (
                                <p>{i + 1} - {capilizeFirstLetters(name)}</p>
                            )
                        }) || `No names found.`}
                    <Link to={'/'} reloadDocument><PrimaryButton>Try Again</PrimaryButton></Link>
                </div>
            </div>
        );
    },
    getFooterSection: (data) => {
        console.log(data.result.outputs[0].model.created_at.seconds);
        return (
            <ModelFooter>
                <div className='celebrity-face-detection-footer-left'>
                    <h1>Model</h1>
                    <p>{data.result.outputs[0].model.name}</p>
                    <h2>Description</h2>
                    <p>Detects whether images contain<br/>celebrity faces. Trained with over <strong>10,000</strong><br/>recognized celebrities.</p>
                    <h2>Powered by</h2>
                    <p>Clarifai</p>
                </div>
            </ModelFooter>
        );
    },
    processBoundingDisplay: (data) => {
        const regions = data.result.outputs[0].data.regions
        const array = [];
        const person = []; 
        const image = document.getElementById('display-image');
        const width = image.width;
        const height = image.height;

        regions.forEach(region => {

            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;

            const box = {
                leftCol: boundingBox.left_col * width,
                topRow: boundingBox.top_row * height,
                rightCol: width - (boundingBox.right_col * width),
                bottomRow: height - (boundingBox.bottom_row * height)
            }

            array.push(box)
            person.push(region.data.concepts[0].name)
        });

        return {
            boxes: array,
            names: person
        };
    }
}

export default celebrityfaceDetection;