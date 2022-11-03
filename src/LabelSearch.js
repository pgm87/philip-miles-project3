
import { useState } from 'react';
import DisplayLabels from './DisplayLabels';


const LabelSearch = () => {
    const [labelSearch, setLabelSearch] = useState('');
    const [submitLabel, setSubmitLabel] = useState('');
    const [displayLabels, setDisplayLabels] = useState(false);



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
                    <input id="label" type="text" onChange={(e) => { handleChange(e) }} value={labelSearch} />
                    <button>Submit</button>
                </form>
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

                    : null

            }
        </>

    )
}

export default LabelSearch;