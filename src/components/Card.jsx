import React from 'react';
import '../styles/Card.css';

const Card = ({ scenario }) => {
    return (
        <div className="card">
            <div className="card-header">
                <span className="card-type">{scenario.type.toUpperCase()}</span>
            </div>
            <div className="card-content">
                {scenario.sender && <div className="card-row"><strong>From:</strong> {scenario.sender}</div>}
                {scenario.subject && <div className="card-row"><strong>Subject:</strong> {scenario.subject}</div>}
                {scenario.filename && <div className="card-row"><strong>File:</strong> {scenario.filename}</div>}

                {scenario.image && (
                    <div className="card-image-container">
                        <img src={scenario.image} alt="Scenario Screenshot" className="card-image" />
                    </div>
                )}

                {scenario.images && (
                    <div className="card-images-grid">
                        {scenario.images.map((img, index) => (
                            <div key={index} className="card-image-container">
                                <img src={img} alt={`Scenario Screenshot ${index + 1}`} className="card-image" />
                            </div>
                        ))}
                    </div>
                )}

                {scenario.body && (
                    <div className="card-body">
                        {scenario.body}
                    </div>
                )}
                {scenario.source && <div className="card-source">Source: {scenario.source}</div>}
            </div>
        </div>
    );
};

export default Card;
