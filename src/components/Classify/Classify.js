import React, { useState, useEffect } from 'react';
import data from '../../data/data.json'; 
import '../Classify/Classify.css';

// Food data
const Food = [
    {
        name: "Banh mi",
        describe: "Loại bánh mì đặc trưng của Việt Nam, thường dùng để kẹp các loại nhân như pate, chả lụa, thịt nướng, rau sống.",
        ingredients: [
            "Bột mì",
            "Men nở",
            "Đường",
            "Muối",
            "Sữa",
            "Bơ",
        ]
    }
];

// Find food function
function findFood(name) {
    return Food.find(food => food.name === name);
}

function Classify() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // To store the preview URL
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload_image', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
            } else {
                setResult({ error: 'Failed to process image' });
            }
        } catch (error) {
            console.error('Error:', error);
            setResult({ error: 'An error occurred' });
        }
    };

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const foodDetails = result && result.best_class_name ? findFood(result.best_class_name) : null;

    return (
        <div className="phrase_app">
            <div className="container">
                <h1>Image Classification</h1>
                {previewImage && (
                    <div>
                        <img src={previewImage} alt="Uploaded Preview" style={{ maxWidth: '100%' }} />
                    </div>
                )}

                <input type="file" onChange={handleFileChange} className="file-input" />
                <button onClick={handleSubmit} disabled={!selectedFile} className="classify-button">
                    Upload and Classify
                </button>
            </div>
            {result && (
                <div className="result-section">
                    <h2>Classification Result:</h2>
                    {result.error ? (
                        <p className="error-message">{result.error}</p>
                    ) : (
                        <>
                            <p>Best Class: {result.best_class_name}</p>
                            <p>Confidence: {parseFloat(result.highest_confidence).toFixed(2)}</p>
                            {foodDetails ? (
                                <>
                                    <h3>Description:</h3>
                                    <p>{foodDetails.describe}</p>
                                    <h3>Ingredients:</h3>
                                    <ul>
                                        {foodDetails.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <p>Food details not available.</p>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Classify;
