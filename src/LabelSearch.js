
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
        <section>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Search By Record Label Below</label>
                <input type="text" onChange={(e) => { handleChange(e) }} value={labelSearch} />
                <button>Submit</button>
            </form>
            <DisplayLabels labelName={submitLabel} />
        </section>
    )
}

export default LabelSearch;