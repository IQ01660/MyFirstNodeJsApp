

const routesHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    
    // the home page
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(
            `<html>
                <head>
                    <title>Home Page</title>
                </head>
                <body>
                    <h1>Home Page</h1>
                    <br/>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" placeholder="username" />
                        <button type="submit">Create User</button>
                    </form>
                </body>
            </html>`
        );
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write(
            `<html>
                <head>
                    <title>Users Page</title>
                </head>
                <body>
                    <ul>
                        <li>Jake</li>
                        <li>John</li>
                        <li>Maria</li>
                    </ul>
                </body>
            </html>`
        );
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const messageBuffers = [];
        req.on('data', (chunk) => {
            messageBuffers.push(chunk);
        });
        req.on('end', () => {
            const parsedMessage = Buffer.concat(messageBuffers).toString();
            const receivedUsername = parsedMessage.split('=')[1];
            console.log(receivedUsername);
            //redirecting to users page
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
        });
    }
}

module.exports = {
    reqHandler: routesHandler
}