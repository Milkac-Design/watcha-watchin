import cookie from 'js-cookie';

export function getFollowers() {
  const followers = cookie.getJSON('followers') || [];
  return followers;
}

export function followUser(id) {
  const followers = getFollowers();
 
  let newFollowers;

  if (followers.length !== 0 && followers.find((user) => user.id === id)) {
    newFollowers = followers.filter((user) => user.id !== id);
  } else if (followers.length !== 0) {
    newFollowers = [...followers];
    newFollowers.push({ id: id });
  } else {
    newFollowers = [{ id: id }];
  }

  cookie.set('followers', newFollowers);
  return newFollowers;
}
