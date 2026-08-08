import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ZoomMermaid({ children }) {
    return (
        <Zoom zoomMargin={20}>
            <div style={{ cursor: 'zoom-in' }}>
                {children}
            </div>
        </Zoom>
    );
}