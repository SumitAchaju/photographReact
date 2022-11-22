import React from 'react';

export default function ProfileFollow(props) {
    const baseUrlImg = "http://127.0.0.1:8000"
  return (
    <>
    {props.follow &&
    <div className="follow-following-follow">
        {props.follow.map(follow=>
                    <div key={follow.id} className="follow-following-follow-single">
                    <div className='follow-following-follow-single-profile'>
                    <div>
                        <img src={baseUrlImg+follow.friends.profile_image} alt="" />
                    </div>
                    <div>
                        <span>{follow.friends.first_name} {follow.friends.last_name}</span>
                    </div>
                    </div>
                    <div>
                        {follow.category==="Mutual"
                        ?<button className='following'>Unfollow</button>
                        :<button>Follow</button>
                    }
                    </div>
                </div>
            )}

    </div>
    }
    </>
  )
}
