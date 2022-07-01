ORIGIN_URL=`git config --get remote.origin.url`

if [ "$ORIGIN_URL" != "$GITHUB_URL" ]; then
  if [ -z "$(git remote | grep origin)" ]; then
    # create new remote origin
    git remote add origin $GITHUB_URL
  else
    # change existing remote origin
    git remote set-url origin $GITHUB_URL
  fi
fi

# checkout branch
git checkout main

# fetch the newest code
git fetch origin main

# hard reset
git reset --hard origin/main

# force pull
git pull origin main --force

# install dependencies
npm install
