# Interview Platform Frontend (Module Federation)

Simple Vite + React setup with a host app and two remotes.

## Apps

| App | Port | Role |
|---|---|---|
| host | 5000 | shell app, owns Redux store |
| auth | 5001 | login / signup / forgot password pages |
| dashboard | 5002 | dashboard page |

## Run

```bash
# install once from this folder
npm install

# terminal 1
npm run dev:auth

# terminal 2
npm run dev:dashboard

# terminal 3
npm run dev:host
```

Open http://localhost:5000

Auth API should be running at http://localhost:4000
