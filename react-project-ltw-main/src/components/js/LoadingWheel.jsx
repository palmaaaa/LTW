import React from 'react';
import '../css/LoadingWheel.css'

function LoadingWheel(props) {
    return (
        <div className="container-fluid loading-wheel-container">
            <div className="row h-100">
                <div className="col-12 h-100 d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-primary"></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingWheel;