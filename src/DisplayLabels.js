import { useEffect, useState } from 'react';
import axios from 'axios';
import LabelReleases from './LabelReleases';

const DisplayLabels = ({ labelName }) => {
    const [labelArray, setLabelArrays] = useState([]);
    const [seeReleases, setSeeReleases] = useState(false);
    const [recordLabelID, setRecordLabelID] = useState(null);

    useEffect(() => {
        if (labelName !== '') {
            axios({
                url: `https://musicbrainz.org/ws/2/label`,
                params: {
                    query: labelName,
                    fmt: 'json'
                }
            }).then((res) => {
                setLabelArrays(res.data.labels);
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

            <ul>
                {
                    labelArray.length > 0 ?
                        labelArray.map((label) => {
                            return (
                                <div key={label.id}>
                                    <li >{label.name} : {label.type} : {label.disambiguation}</li>
                                    < button onClick={() => handleClick(label.id)} >SHOW ME ALBUMS</button>

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