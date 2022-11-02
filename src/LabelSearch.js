
import { useState } from 'react';
import DisplayLabels from './DisplayLabels';


const LabelSearch = () => {
    const [labelSearch, setLabelSearch] = useState('');
    const [submitLabel, setSubmitLabel] = useState('');



    const handleSubmit = (e) => {

        e.preventDefault();
        setSubmitLabel(labelSearch);
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

            </section>
            <section className='labelNames wrapper'>
                <DisplayLabels labelName={submitLabel} />
            </section>
        </>
    )
}

export default LabelSearch;