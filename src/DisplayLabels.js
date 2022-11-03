import { useEffect, useState } from 'react';
import axios from 'axios';
import LabelReleases from './LabelReleases';

const DisplayLabels = ({ labelName }) => {
    const [labelArray, setLabelArrays] = useState([]);
    const [seeReleases, setSeeReleases] = useState(false);
    const [recordLabelID, setRecordLabelID] = useState(null);
    const [labelsNotFound, setLabelsNotFound] = useState(false);
    const [offset, setOffset] = useState(0);

    const handleClickBack = () => {
        setOffset(offset - 5);
    }
    const handleClickForward = () => {
        setOffset(offset + 5);
    }

    useEffect(() => {
        if (labelName !== '') {
            axios({
                url: `https://musicbrainz.org/ws/2/label`,
                params: {
                    query: labelName,
                    fmt: 'json',
                    limit: 5,
                    offset: offset
                }
            }).then((res) => {
                if (res.data.labels.length > 0) {
                    setLabelArrays(res.data.labels);
                    setLabelsNotFound(false);
                }
                else {
                    setLabelsNotFound(true);
                }
            })
        }
    }, [labelName, offset])
    const handleClick = (id) => {
        setSeeReleases(!seeReleases);
        setRecordLabelID(id);
    }
    const handleShowDisplay = () => {
        setSeeReleases(!seeReleases);
    }
    return (
        <>
            <h2>Labels Names</h2>
            <ul className='labelReleasesUL'>
                {
                    offset > 0 && labelsNotFound === false ?
                        <button className="btnBackLabels" onClick={handleClickBack}>
                            <i className="fa-solid fa-backward-step" alt="Click Backward through Labels"></i>
                        </button>
                        : null
                }
                {
                    labelsNotFound === true ?
                        <h3>No Labels Found</h3>
                        :
                        labelArray.length > 0 ?
                            labelArray.map((label) => {
                                return (
                                    <div key={label.id} className="labelNameContainer">
                                        <li className='labelListItem'>{`${label.name} `}
                                            --- {label.disambiguation === undefined ? <>No more information to display</> : label.disambiguation}</li>
                                        < button onClick={() => handleClick(label.id)} disabled={seeReleases} >See Releases</button>
                                    </div>
                                )
                            })
                            : null
                }
                {
                    labelArray.length > 4 && labelsNotFound === false ?
                        <button className="btnForwardLabels" onClick={handleClickForward}><i className="fa-solid fa-forward-step"></i></button>
                        : null
                }
            </ul>
            <section className={seeReleases === false ? 'hidden' : 'labelReleases'}>
                <h2>Display releases</h2>
                {
                    seeReleases === true ?
                        <LabelReleases id={recordLabelID} />
                        : null
                }
                <button onClick={handleShowDisplay} className="xButton"><i className="fa-solid fa-x" alt="click forward through labels"></i></button>
            </section>
        </>
    )

}

export default DisplayLabels;