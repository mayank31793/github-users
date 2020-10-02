import React from 'react';

import deleteImg from '../../assets/delete.svg';
import githubImg from '../../assets/github.svg';
import locationImg from '../../assets/location.svg';
import nameImg from '../../assets/name.svg';
import followersImg from '../../assets/followers.svg';
import "./list.scss";

const List = ({searchArray, handleDelete}) => {
    return (
        <>
            <ul>
			    {searchArray.map((res) => <li key={res.id}>
					<div className="profilePic">
						<img src={res.avatar_url} alt="avatar" />
					</div>
					<div className="profileInfo">
						<div className="singleInfo">
							<div className="icon">
								<img src={nameImg} alt="name" />
							</div>
							<div className="iconInfo">
								<p>{res.name}</p>
							</div>
						</div>
						<div className="singleInfo">
							<div className="icon">
								<img src={githubImg} alt="github" />
							</div>
							<div className="iconInfo">
								<a href={res.html_url} target="_blank"><p>{res.html_url}</p></a>
							</div>
						</div>
						<div className="singleInfo">
							<div className="icon">
								<img src={locationImg} alt="location" />
							</div>
							<div className="iconInfo">
								<p>{res.location != null ?<span>{res.location}</span>:<span>NULL</span> }</p>
							</div>
						</div>
						<div className="singleInfo">
							<div className="icon">
								<img src={followersImg} />
							</div>
							<div className="iconInfo">
								<p>{res.followers}</p>
							</div>
						</div>
						<div className="deleteIcon" onClick={() => handleDelete(res.id,res.name)}>
							<img src={deleteImg} alt="delete" />
						</div>
					</div>
				</li>)}
			</ul>
        </>
    );
}
 
export default List;