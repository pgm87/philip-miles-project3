import { useEffect, useState } from 'react';
import axios from 'axios';
import LabelReleases from './LabelReleases';


const DisplayLabels = ({ labelName }) => {
    const [labelArray, setLabelArrays] = useState([]);
    const [seeReleases, setSeeReleases] = useState(false);


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
            })
        }
        console.log(labelName);
    }, [labelName])
    const handleClick = (id) => {
        setSeeReleases(!seeReleases);
    }
    return (
        <>
            <ul >
                {
                    labelArray.length > 0 ?
                        labelArray.map((label) => {
                            return (
                                <>
                                    <li>{label.name} : {label.type} : {label.disambiguation}</li>
                                    <button onClick={handleClick}>SHOW ME ALBUMS</button>
                                    {
                                        seeReleases ?
                                            <LabelReleases id={label.id} />
                                            : null
                                    }
                                </>
                            )
                        })
                        : <li>No Label Found</li>
                }

            </ul>


        </>
    )

}

export default DisplayLabels;