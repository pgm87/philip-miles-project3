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
                method: "GET",
                params: {
                    query: labelName,
                    fmt: 'json'
                }
            }).then((res) => {
                setLabelArrays(res.data.labels);
                console.log(labelArray);
            })
        }
    }, [labelName])
    const handleClick = (id) => {
        setSeeReleases(!seeReleases);
        setRecordLabelID(id)
    }
    return (
        <>
            <ul >
                {
                    labelArray.length > 0 ?
                        labelArray.map((label) => {
                            return (
                                <div key={label.id}>
                                    <li >{label.name} : {label.type} : {label.disambiguation}</li>
                                    <button onClick={() => handleClick(label.id)}>SHOW ME ALBUMS</button>
                                    {
                                        recordLabelID === label.id ?
                                            <LabelReleases id={recordLabelID} />
                                            : null
                                    }
                                </div>
                            )
                        })
                        : null
                }

            </ul>


        </>
    )

}

export default DisplayLabels;