import axios from "axios";
import { useEffect, useState } from "react";
// lookup:   /<ENTITY_TYPE>/<MBID>?inc=<INC>

const LabelReleases = ({ id }) => {

    const [releasesArray, setReleasesArray] = useState([]);

    const [offset, setOffset] = useState(0);
    const handleClickBack = () => {
        setOffset(offset - 10);
    }
    const handleClickForward = () => {
        setOffset(offset + 10);
    }

    useEffect(() => {
        if (id !== '') {
            axios({
                url: `https://musicbrainz.org/ws/2/release?label=${id}`,
                params: {
                    fmt: 'json',
                    inc: 'artist-credits+genres+media',
                    offset: offset,
                    limit: 5
                }
            }).then((res) => {
                setReleasesArray(res.data.releases);
            })
        }

    }, [id, offset]);



    return (
        <>
            <ul>
                {
                    offset > 0 ?
                        <button className="btnBack" onClick={handleClickBack}>B</button>
                        : null
                }
                {
                    releasesArray.length > 0 ?
                        releasesArray.map((release) => {
                            return (
                                < div key={release.id} className="labelReleaseContainer" >
                                    <li>

                                        {release["artist-credit"].map((artist) => {
                                            return (
                                                artist["name"] + artist["joinphrase"]
                                            )
                                        })}
                                        -
                                        {release.title}
                                        {
                                            release["cover-art-archive"].front === false ?
                                                <div className="imgContainer"><i className="fa-solid fa-record-vinyl"></i></div>
                                                :
                                                <div className="imgContainer"><img src={`https://coverartarchive.org/release/${release.id}/front`} alt="Album cover for {release.title}" /></div>
                                        }
                                    </li>
                                </div>
                            )
                        })
                        : null
                }
                {
                    releasesArray.length > 0 ?
                        <button className="btnForward" onClick={handleClickForward}>F</button>
                        : null
                }

            </ul >

        </>
    )
}

export default LabelReleases;