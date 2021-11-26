import {useEffect, useState} from 'react';
import {Badge} from 'react-bootstrap'

function GistList(){

    const [gistLists, setGistLists] = useState([]);

    const fetchGists = (username) => {
        fetch(`https://api.github.com/users/${username}/gists`)
            .then(response => response.json())
            .then(response => {
                if (response instanceof Array) {
                    const array = [];
                    response.forEach(element => {
                        const fileTypes = [];
                        Object.keys(element.files).forEach(key => {
                            fileTypes.push(<Badge key={element.files[key].filename} pill bg="secondary">{element.files[key].language}</Badge>);
                        });
                        array.push(
                            <div key={element.id} className="card list-card">
                                <div className="card-body">
                                    <h5 className="card-title">{element.id}</h5>
                                    <div className="card-content">
                                        <div className="card-descrtiption">
                                            <p className="card-text">{element.description}</p>
                                        </div>
                                        <div className="forks-contain">
                                            <div className="fork-user">
                                                <img src={element.owner.avatar_url} alt="profile" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="badge-contain">
                                        {fileTypes}
                                    </div>
                                </div>
                            </div>
                        )
                    });
                    setGistLists(array);
                } else {
                    setGistLists([]);
                }
            });
    }

    const handleInputChange = (event) => {
        if (event.target.value) {
            fetchGists(event.target.value);
        }
    }

    useEffect(() => {

    })

    return (
        <div className="container">
        <div className="main-content">
            <div className="form-contain">
                <div className="input-textbox">
                    <label className="form-label">Username</label>
                    <input placeholder="search username here" onChange={handleInputChange} type="text" className="form-control"/>
                </div>
                <div className="cards-contain">
                    {gistLists}
                </div>
            </div>
        </div>
    </div>
    )
}

export default GistList;