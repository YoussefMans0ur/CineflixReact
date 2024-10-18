import React, { useState, useEffect } from 'react';

export default function SaveButton({ itemDetails, media_type, saveType}) {
    const [isSaved, setIsSaved] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addRedClass, setAddRedClass] = useState(false); // State to manage red class
    let {id, poster_path, vote_average} = itemDetails;
    let title = itemDetails.title || itemDetails.name;

    useEffect(() => {
        let savedItems = getSavedItems();
        let alreadySaved = savedItems.some((item) => item.id === id && item.media_type === media_type);
        setIsSaved(alreadySaved);
        // Check if the 'red' class should be applied from localStorage
        const redClassState = JSON.parse(localStorage.getItem(`redClass_${id}_${media_type}`));
        if (redClassState) setAddRedClass(true);
    },[id, media_type]);

    const getSavedItems = () => {
        let saved = localStorage.getItem('savedItems');
        return saved ? JSON.parse(saved) : [];
    };
    const handleSave = () => {
        let savedItems = getSavedItems();
        let newItem = { id, media_type, title, vote_average, poster_path };
        let updatedItems = [...savedItems, newItem];
        localStorage.setItem('savedItems', JSON.stringify(updatedItems));
        setIsSaved(true);
        setShowAlert(true);
        hideAlertAfterDelay();
        // Schedule the "red" class to be added after 3 seconds
        setTimeout(() => {
            setAddRedClass(true);
            localStorage.setItem(`redClass_${id}_${media_type}`, true); // Persist red class // Set the state to add the class
        }, 2000);
    };
    const handleUnsave = () => {
        let savedItems = getSavedItems();
        let updatedItems = savedItems.filter((item) => item.id !== id || item.media_type !== media_type);
        localStorage.setItem('savedItems', JSON.stringify(updatedItems));
        setIsSaved(false);
        setShowAlert(true); 
        hideAlertAfterDelay(); 
        // Remove 'red' class and update localStorage
        setAddRedClass(false);
        localStorage.removeItem(`redClass_${id}_${media_type}`); // Remove persisted state
    };
    const hideAlertAfterDelay = () => {
        setTimeout(() => {
            setShowAlert(false);
        }, 1000);
    };

    if(saveType === 'button') {
        return (
        <button
        className={`btn mt-3 me-3 px-3 py-2 ${isSaved ? 'btn-danger' : 'btn-light'}`}
        onClick={isSaved ? handleUnsave : handleSave}
        >
        {isSaved ? <><i className="fa-solid fa-bookmark pe-2"></i>Unsave</> : <><i className="fa-regular fa-bookmark pe-2"></i>Save</>}
        </button>
        )
    } else if(saveType === 'icon') {
        return (<>
            {/* <i onClick={isSaved ? handleUnsave : handleSave} className={`${isSaved ? 'text-danger' : 'text-warning'} h1 fa-solid fa-bookmark bookmark position-absolute top-0 start-0 ms-1`}></i> */}
            {/* <i onClick={isSaved ? handleUnsave : handleSave} className={`${isSaved ? 'text-warning' : 'text-primary'} h1 fa-solid fa-bookmark bookmark position-absolute top-0 start-0 ms-1`}></i> */}
            <i onClick={isSaved ? handleUnsave : handleSave} className={`${isSaved ? 'text-warning' : 'text-info'} fa-solid fa-bookmark bookmark position-absolute top-0 start-0 ms-3 ms-md-2 ${addRedClass? 'red' : ''}`}>
                {showAlert && (
                <p className='h6 unsave-alert bg-black px-1 rounded-3 position-fixed 
                              top-0 mt-3 start-50 translate-middle-x py-1'>
                    {isSaved ? 'Saved' : 'Unsaved'}
                    {isSaved ? (
                        <i className="fa-regular fa-face-smile-wink ps-1"></i>
                    ) : (
                        <i className="fa-regular fa-face-frown ps-1"></i>
                    )}
                </p>
            )}
            </i>
             {/* <i onClick={isSaved ? handleUnsave : handleSave} className={`${isSaved ? 'fa-solid' : 'fa-regular'} h1 text-warning fa-bookmark bookmark position-absolute top-0 start-0 ms-2`}></i> */}
        </>)
    }
}
