import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import { LoaderContext } from '../context/LoaderContext';

describe('Loader', () => {
    const renderLoader = (loading) => {
        return render(
            <LoaderContext.Provider value={{ loading }}>
                <Loader />
            </LoaderContext.Provider>
        );
    };

    it('renders nothing when loading is false', () => {
        renderLoader(false);
        const loaderContainer = document.getElementById('loader-container');
        expect(loaderContainer).not.toBeInTheDocument();
    });

    it('renders the loader when loading is true', () => {
        renderLoader(true);
        const loaderContainer = document.getElementById('loader-container');
        expect(loaderContainer).toBeInTheDocument();
        expect(document.querySelector(".loader")).toBeInTheDocument();
    });
});