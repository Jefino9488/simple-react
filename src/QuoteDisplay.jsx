import React, { useState, useEffect } from 'react';

function QuoteDisplay() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        fetchQuote();
    }, []);

    const fetchQuote = () => {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => setQuote(data.content))
            .catch(error => console.error('Error fetching quote:', error));
    };

    return (
        <div>
            <h2>Random Quote</h2>
            <blockquote>{quote}</blockquote>
            <button onClick={fetchQuote}>Get Another Quote</button>
        </div>
    );
}

export default QuoteDisplay;
