# Microfrontend App with Module Federation

This project is a demonstration of a **Microfrontend architecture** using **Webpack 5's Module Federation**. It includes a **Host App** and a **Remote App**, showing how to dynamically load and integrate a smaller application into a larger one.

  * The **Host App** (`host-app`) is the main application that loads and displays the remote.
  * The **Remote App** (`remote-app1`) can run independently for development or be embedded dynamically by the host.

-----

## 🧱 Architecture

The core of this architecture is the relationship between the host and the remote. The remote app exposes a `mount()` function, which the host app uses to render the remote's content into a specified container.

```
host-app/
│
├── Loads remote-app1 dynamically
│   and mounts it into a container div
│
remote-app1/
│
├── Exposes a mount(container) function
│   for the host app to embed it
│
├── Also renders itself in standalone mode
│   when run independently (e.g., for dev)
```

-----

## 📁 Project Structure

```
microfrontend/
├── host-app/
│   └── React app that loads remotes
│
├── remote-app1/
└── React app that exposes itself via mount()
```

-----

## 🚀 Getting Started

### 1\. Clone the Repo

First, clone this repository to your local machine.

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

Remember to replace `<your-username>` and `<your-repo-name>` with your actual GitHub repository details.

### 2\. Install Dependencies

You'll need to install the dependencies for both the host and the remote apps.

```bash
cd host-app
npm install

cd ../remote-app1
npm install
```

### 3\. Run the Apps

Start both applications in separate terminal windows.

**Run the Remote App (Standalone mode for dev)**

```bash
cd remote-app1
npm start
```

This will run the remote app on `http://localhost:3001`.

**Run the Host App (Loads remote dynamically)**

```bash
cd host-app
npm start
```

This will run the host app on `http://localhost:3000`. It will dynamically load and display the remote app's content.

-----

## 🧠 How It Works

The **Module Federation Plugin** is what makes this architecture possible.

  * The remote app exposes its `mount()` function via the plugin configuration.

  * When running in standalone development mode, the remote app automatically mounts itself to the root DOM element using an environment variable check:

    ```javascript
    if (process.env.STANDALONE === 'true') {
        mount(document.getElementById('root'));
    }
    ```

  * The host app loads the remote at runtime and calls its exposed `mount()` function to embed it into a designated container:

    ```javascript
    import('remoteApp1/mount').then(({ mount }) => {
        mount(document.getElementById('remote-root'));
    });
    ```

-----

## 🛠 Tech Stack

  * **React 19**
  * **Webpack 5**
  * **Module Federation Plugin**
  * **Babel**
  * **HTML Webpack Plugin**

-----

## 📦 Build Scripts

| App           | Script          | Description                              |
|---------------|-----------------|------------------------------------------|
| `remote-app1` | `npm start`     | Runs the remote in standalone mode       |
| `host-app`    | `npm start`     | Runs the host that loads the remote      |
| Both          | `npm run build` | Builds a production bundle for the app   |

-----

