import { useEffect, useState } from 'react';
import axios from 'axios';
import LabelReleases from './LabelReleases';

const DisplayLabels = ({ labelName }) => {
    const [labelArray, setLabelArrays] = useState([]);
    const [seeReleases, setSeeReleases] = useState(false);
    const [recordLabelID, setRecordLabelID] = useState(null);
    const [labelsNotFound, setLabelsNotFound] = useState(false);

    useEffect(() => {
        if (labelName !== '') {
            axios({
                url: `https://musicbrainz.org/ws/2/label`,
                params: {
                    query: labelName,
                    fmt: 'json'
                }
            }).then((res) => {
                if (res.data.labels.length > 0) {
                    setLabelArrays(res.data.labels);
                }
                else {
                    setLabelsNotFound(true);
                }
            })
        }
    }, [labelName])
    const handleClick = (id) => {
        setSeeReleases(!seeReleases);
        setRecordLabelID(id)
    }
    const handleShowDisplay = () => {
        setSeeReleases(!seeReleases);
    }
    return (
        <>
            <ul className={seeReleases === true ? 'contentNone' : null}>{
                labelsNotFound === true ?
                    <h3>No Labels Found</h3>
                    :
                    labelArray.length > 0 ?
                        labelArray.map((label) => {
                            return (
                                <div key={label.id} className="labelNameContainer">
                                    <li className='labelListItem'>{label.name}
                                        - {label.type === undefined ? <>Type of Label Unavailable</> : label.type}
                                        - {label.disambiguation === undefined ? <>No more information to display</> : label.disambiguation}</li>
                                    < button onClick={() => handleClick(label.id)} >Releases</button>
                                </div>
                            )
                        })
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
                <button onClick={handleShowDisplay} className="xButton"><i className="fa-solid fa-x"></i></button>
            </section>
        </>
    )

}

export default DisplayLabels;