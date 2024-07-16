import defaultAvatar from '../assets/default_avatar.png';
function DefaultAvatar () {
    return <img className="h-24 w-24 self-center rounded-full object-cover" src={defaultAvatar} alt="" />
}

export default DefaultAvatar;