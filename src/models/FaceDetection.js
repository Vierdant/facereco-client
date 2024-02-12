import './styles/FaceDetection.css'

import ResultDisplay from '../components/ResultDisplay/ResultDisplay';
import ModelFooter from '../sections/ModelFooter/ModelFooter';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';
import ModelRating from '../components/ModelRating/ModelRating';

const faceDetection = {
    getDisplay: (data, onProcessRequest) => {
        return (
            <div className='face-detection-container'>
                <div className='face-detection-result'>
                    <ResultDisplay imageURL={data.imageURL} boundingBoxes={data.processedResult.boxes} onProcessRequest={onProcessRequest}/>
                </div>
                <div style={{display: 'inherit'}}>
                    <div className='face-detection-details'>
                        <h2>Results</h2>
                        <p>Faces found: {data.result.outputs[0].data.regions.length}</p>
                        <Link to={'/'} reloadDocument><PrimaryButton>Try again</PrimaryButton></Link>
                        <ModelRating to={'face-detection'} rating={data.profile}/>
                    </div>
                </div>
            </div>
        );
    },
    getFooterSection: (data) => {
        return (
            <ModelFooter>
                <div className='face-detection-footer-left'>
                    <h1>Model</h1>
                    <p>{data.result.outputs[0].model.id}</p>
                    <h2>Description</h2>
                    <p>Detects whether images contain<br/>a human face.</p>
                    <h2>Powered by</h2>
                    <p>Clarifai</p>
                </div>
            </ModelFooter>
        );
    },
    processBoundingDisplay: (data) => {
        const regions = data.result.outputs[0].data.regions
        const array = [];
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
        });

        return {
            boxes: array
        };
    }
}

export default faceDetection;