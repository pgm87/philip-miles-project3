
import { useState } from 'react';
import DisplayLabels from './DisplayLabels';


const LabelSearch = () => {
    // variables to check if 
    const [labelSearch, setLabelSearch] = useState('');
    const [submitLabel, setSubmitLabel] = useState('');
    const [displayLabels, setDisplayLabels] = useState(false);


    // Handle Submit function, grabs value and passes it on to children
    const handleSubmit = (e) => {

        e.preventDefault();
        setSubmitLabel(labelSearch);
        setLabelSearch('');
        setDisplayLabels(true);
    }

    const handleChange = (e) => {
        setLabelSearch(e.target.value);
    }
    return (
        <>
            <section className='formSearch wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="label">Search By Record Label Below</label>
                    <input id="label" type="text" onChange={(e) => { handleChange(e) }} value={labelSearch} required={true} />
                    <button>Submit</button>
                </form>
                {/* checks to see what header to display */}
                {
                    displayLabels === true ?
                        <h3 className='labelHeaderHelp'>Labels are in check 'em out</h3>
                        :
                        <h3 className='labelHeaderHelp'>Search for those labels</h3>
                }
            </section>
            {
                displayLabels === true ?
                    <section className='labelNames wrapper'>
                        <DisplayLabels labelName={submitLabel} />
                    </section>

                    : <div className='labelLoad wrapper'>
                        <div className="largeRecordSpinning"><i className="fa-solid fa-record-vinyl" alt="Spinnging Record"></i></div>
                    </div>
            }
        </>

    )
}

export default LabelSearch;